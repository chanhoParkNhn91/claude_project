package com.konomad.service

import com.konomad.dto.CityResponse
import com.konomad.dto.CityScores
import com.konomad.entity.City
import com.konomad.repository.CityRepository
import org.springframework.stereotype.Service

@Service
class CityService(
    private val cityRepository: CityRepository
) {

    fun getAllCities(): List<CityResponse> {
        return cityRepository.findAll().map { toCityResponse(it) }
    }

    fun getCityBySlug(slug: String): CityResponse {
        val city = cityRepository.findBySlug(slug)
            ?: throw NoSuchElementException("도시를 찾을 수 없습니다: $slug")
        return toCityResponse(city)
    }

    private fun toCityResponse(city: City): CityResponse {
        return CityResponse(
            id = city.id,
            slug = city.slug,
            name = city.name,
            region = city.region,
            regionGroup = city.regionGroup,
            environment = city.environment,
            image = city.image,
            description = city.description,
            monthlyCost = city.monthlyCost,
            rentCost = city.rentCost,
            foodCost = city.foodCost,
            transportCost = city.transportCost,
            internetSpeed = city.internetSpeed,
            cafeCount = city.cafeCount,
            coworkingCount = city.coworkingCount,
            temperature = city.temperature,
            weatherIcon = city.weatherIcon,
            airQualityIndex = city.airQualityIndex,
            scores = CityScores(
                cafeWork = city.scoreCafeWork,
                coworking = city.scoreCoworking,
                internet = city.scoreInternet,
                costSatisfaction = city.scoreCostSatisfaction,
                transport = city.scoreTransport,
                delivery = city.scoreDelivery,
                medical = city.scoreMedical,
                nature = city.scoreNature,
                noise = city.scoreNoise,
                airQuality = city.scoreAirQuality,
                safety = city.scoreSafety,
                nightlife = city.scoreNightlife,
                community = city.scoreCommunity,
                foreignFriendly = city.scoreForeignFriendly
            ),
            nomadScore = city.nomadScore,
            reviewCount = city.reviewCount,
            likePercent = city.likePercent
        )
    }
}
