package com.konomad.entity

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true, nullable = false)
    val email: String = "",

    @Column(nullable = false)
    val password: String = "",

    val name: String = "",

    val profileImage: String = "",

    val jobType: String = "기타",

    val currentCity: String = "",

    @Column(name = "created_at")
    val createdAt: LocalDateTime = LocalDateTime.now()
)
