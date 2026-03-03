package com.konomad.controller

import com.konomad.dto.ReviewRequest
import com.konomad.dto.ReviewResponse
import com.konomad.service.ReviewService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reviews")
class ReviewController(
    private val reviewService: ReviewService
) {

    @GetMapping
    fun getReviews(
        @RequestParam(required = false) citySlug: String?,
        @RequestParam(required = false, defaultValue = "latest") sort: String
    ): ResponseEntity<List<ReviewResponse>> {
        if (citySlug.isNullOrBlank()) {
            throw IllegalArgumentException("citySlug 파라미터는 필수입니다")
        }

        var reviews = reviewService.getReviewsByCitySlug(citySlug)

        reviews = when (sort) {
            "latest" -> reviews.sortedByDescending { it.createdAt }
            "helpful" -> reviews.sortedByDescending { it.helpful }
            "score" -> reviews.sortedByDescending { it.totalScore }
            else -> reviews.sortedByDescending { it.createdAt }
        }

        return ResponseEntity.ok(reviews)
    }

    @GetMapping("/my")
    fun getMyReviews(authentication: Authentication): ResponseEntity<List<ReviewResponse>> {
        val userId = authentication.principal as Long
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId))
    }

    @PostMapping
    fun createReview(
        authentication: Authentication,
        @Valid @RequestBody request: ReviewRequest
    ): ResponseEntity<ReviewResponse> {
        val userId = authentication.principal as Long
        return ResponseEntity.ok(reviewService.createReview(userId, request))
    }

    @PostMapping("/{id}/helpful")
    fun toggleHelpful(@PathVariable id: Long): ResponseEntity<ReviewResponse> {
        return ResponseEntity.ok(reviewService.toggleHelpful(id))
    }
}
