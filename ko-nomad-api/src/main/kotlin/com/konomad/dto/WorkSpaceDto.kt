package com.konomad.dto

data class WorkSpaceResponse(
    val id: Long,
    val citySlug: String,
    val name: String,
    val type: String,
    val address: String,
    val lat: Double,
    val lng: Double,
    val outlet: String,
    val wifiSpeed: Int,
    val priceRange: String,
    val seatComfort: Int,
    val noiseLevel: String,
    val openHours: String,
    val rating: Double,
    val reviewCount: Int,
    val tags: List<String>
)
