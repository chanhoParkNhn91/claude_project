package com.konomad.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "reviews")
data class Review(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val citySlug: String = "",

    val userId: Long? = null,

    val userName: String = "",

    val userImage: String = "",

    val stayDuration: String = "",

    val stayPurpose: String = "",

    val visitDate: String = "",

    val scoreCafeWork: Int = 0,

    val scoreInternet: Int = 0,

    val scoreCost: Int = 0,

    val scoreTransport: Int = 0,

    val scoreHousing: Int = 0,

    val scoreNature: Int = 0,

    val scoreSafety: Int = 0,

    val scoreCommunity: Int = 0,

    @Column(length = 1000)
    val pros: String = "",

    @Column(length = 1000)
    val cons: String = "",

    val totalScore: Double = 0.0,

    val helpful: Int = 0,

    val createdAt: LocalDateTime = LocalDateTime.now()
)
