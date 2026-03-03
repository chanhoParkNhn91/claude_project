package com.konomad.repository

import com.konomad.entity.City
import org.springframework.data.jpa.repository.JpaRepository

interface CityRepository : JpaRepository<City, Long> {
    fun findBySlug(slug: String): City?
    fun findByRegionGroup(regionGroup: String): List<City>
}
