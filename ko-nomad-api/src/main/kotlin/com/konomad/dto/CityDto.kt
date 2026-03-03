package com.konomad.dto

data class CityScores(
    val cafeWork: Int,
    val coworking: Int,
    val internet: Int,
    val costSatisfaction: Int,
    val transport: Int,
    val delivery: Int,
    val medical: Int,
    val nature: Int,
    val noise: Int,
    val airQuality: Int,
    val safety: Int,
    val nightlife: Int,
    val community: Int,
    val foreignFriendly: Int
)

data class CityResponse(
    val id: Long,
    val slug: String,
    val name: String,
    val region: String,
    val regionGroup: String,
    val environment: String,
    val image: String,
    val description: String,
    val monthlyCost: Int,
    val rentCost: Int,
    val foodCost: Int,
    val transportCost: Int,
    val internetSpeed: Int,
    val cafeCount: Int,
    val coworkingCount: Int,
    val temperature: Int,
    val weatherIcon: String,
    val airQualityIndex: Int,
    val scores: CityScores,
    val nomadScore: Double,
    val reviewCount: Int,
    val likePercent: Int
)

data class CityListResponse(
    val cities: List<CityResponse>,
    val total: Int
)
