package com.konomad.repository

import com.konomad.entity.Review
import org.springframework.data.jpa.repository.JpaRepository

interface ReviewRepository : JpaRepository<Review, Long> {
    fun findByCitySlug(citySlug: String): List<Review>
    fun findByUserId(userId: Long): List<Review>
}
