package com.konomad.controller

import com.konomad.dto.CityListResponse
import com.konomad.dto.CityResponse
import com.konomad.service.CityService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/cities")
class CityController(
    private val cityService: CityService
) {

    @GetMapping
    fun getAllCities(
        @RequestParam(required = false) region: String?,
        @RequestParam(required = false) environment: String?,
        @RequestParam(required = false, defaultValue = "nomadScore") sort: String,
        @RequestParam(required = false) search: String?
    ): ResponseEntity<CityListResponse> {
        var cities = cityService.getAllCities()

        if (!region.isNullOrBlank()) {
            cities = cities.filter { it.regionGroup == region }
        }

        if (!environment.isNullOrBlank()) {
            cities = cities.filter { it.environment == environment }
        }

        if (!search.isNullOrBlank()) {
            val query = search.lowercase()
            cities = cities.filter {
                it.name.lowercase().contains(query) ||
                        it.region.lowercase().contains(query) ||
                        it.description.lowercase().contains(query)
            }
        }

        cities = when (sort) {
            "nomadScore" -> cities.sortedByDescending { it.nomadScore }
            "monthlyCost" -> cities.sortedBy { it.monthlyCost }
            "reviewCount" -> cities.sortedByDescending { it.reviewCount }
            "internetSpeed" -> cities.sortedByDescending { it.internetSpeed }
            else -> cities.sortedByDescending { it.nomadScore }
        }

        return ResponseEntity.ok(CityListResponse(cities = cities, total = cities.size))
    }

    @GetMapping("/{slug}")
    fun getCityBySlug(@PathVariable slug: String): ResponseEntity<CityResponse> {
        return ResponseEntity.ok(cityService.getCityBySlug(slug))
    }
}
