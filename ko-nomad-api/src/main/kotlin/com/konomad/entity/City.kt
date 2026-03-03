package com.konomad.entity

import jakarta.persistence.*

@Entity
@Table(name = "cities")
data class City(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true, nullable = false)
    val slug: String = "",

    val name: String = "",

    val region: String = "",

    val regionGroup: String = "",

    val environment: String = "",

    val image: String = "",

    @Column(length = 500)
    val description: String = "",

    val monthlyCost: Int = 0,

    val rentCost: Int = 0,

    val foodCost: Int = 0,

    val transportCost: Int = 0,

    val internetSpeed: Int = 0,

    val cafeCount: Int = 0,

    val coworkingCount: Int = 0,

    val temperature: Int = 0,

    val weatherIcon: String = "",

    val airQualityIndex: Int = 0,

    val scoreCafeWork: Int = 0,

    val scoreCoworking: Int = 0,

    val scoreInternet: Int = 0,

    val scoreCostSatisfaction: Int = 0,

    val scoreTransport: Int = 0,

    val scoreDelivery: Int = 0,

    val scoreMedical: Int = 0,

    val scoreNature: Int = 0,

    val scoreNoise: Int = 0,

    val scoreAirQuality: Int = 0,

    val scoreSafety: Int = 0,

    val scoreNightlife: Int = 0,

    val scoreCommunity: Int = 0,

    val scoreForeignFriendly: Int = 0,

    val nomadScore: Double = 0.0,

    val reviewCount: Int = 0,

    val likePercent: Int = 0
)
