package com.konomad.entity

import jakarta.persistence.*

@Entity
@Table(name = "workspaces")
data class WorkSpace(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val citySlug: String = "",

    val name: String = "",

    val type: String = "",

    val address: String = "",

    val lat: Double = 0.0,

    val lng: Double = 0.0,

    val outlet: String = "보통",

    val wifiSpeed: Int = 0,

    val priceRange: String = "",

    val seatComfort: Int = 3,

    val noiseLevel: String = "보통",

    val openHours: String = "",

    val rating: Double = 0.0,

    val reviewCount: Int = 0,

    val tags: String = ""
)
