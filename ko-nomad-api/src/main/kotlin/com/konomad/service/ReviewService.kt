package com.konomad.service

import com.konomad.dto.ReviewRequest
import com.konomad.dto.ReviewResponse
import com.konomad.dto.ReviewScores
import com.konomad.entity.Review
import com.konomad.repository.ReviewRepository
import com.konomad.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class ReviewService(
    private val reviewRepository: ReviewRepository,
    private val userRepository: UserRepository
) {

    fun getReviewsByCitySlug(citySlug: String): List<ReviewResponse> {
        return reviewRepository.findByCitySlug(citySlug).map { toReviewResponse(it) }
    }

    fun getReviewsByUserId(userId: Long): List<ReviewResponse> {
        return reviewRepository.findByUserId(userId).map { toReviewResponse(it) }
    }

    fun createReview(userId: Long, request: ReviewRequest): ReviewResponse {
        val user = userRepository.findById(userId)
            .orElseThrow { NoSuchElementException("사용자를 찾을 수 없습니다") }

        val totalScore = listOf(
            request.scoreCafeWork, request.scoreInternet, request.scoreCost,
            request.scoreTransport, request.scoreHousing, request.scoreNature,
            request.scoreSafety, request.scoreCommunity
        ).average()

        val review = reviewRepository.save(
            Review(
                citySlug = request.citySlug,
                userId = userId,
                userName = user.name,
                userImage = user.profileImage,
                stayDuration = request.stayDuration,
                stayPurpose = request.stayPurpose,
                visitDate = request.visitDate,
                scoreCafeWork = request.scoreCafeWork,
                scoreInternet = request.scoreInternet,
                scoreCost = request.scoreCost,
                scoreTransport = request.scoreTransport,
                scoreHousing = request.scoreHousing,
                scoreNature = request.scoreNature,
                scoreSafety = request.scoreSafety,
                scoreCommunity = request.scoreCommunity,
                pros = request.pros,
                cons = request.cons,
                totalScore = Math.round(totalScore * 10) / 10.0
            )
        )

        return toReviewResponse(review)
    }

    fun toggleHelpful(reviewId: Long): ReviewResponse {
        val review = reviewRepository.findById(reviewId)
            .orElseThrow { NoSuchElementException("리뷰를 찾을 수 없습니다") }

        val updated = reviewRepository.save(review.copy(helpful = review.helpful + 1))
        return toReviewResponse(updated)
    }

    private fun toReviewResponse(review: Review): ReviewResponse {
        return ReviewResponse(
            id = review.id,
            citySlug = review.citySlug,
            userId = review.userId,
            userName = review.userName,
            userImage = review.userImage,
            stayDuration = review.stayDuration,
            stayPurpose = review.stayPurpose,
            visitDate = review.visitDate,
            scores = ReviewScores(
                cafeWork = review.scoreCafeWork,
                internet = review.scoreInternet,
                cost = review.scoreCost,
                transport = review.scoreTransport,
                housing = review.scoreHousing,
                nature = review.scoreNature,
                safety = review.scoreSafety,
                community = review.scoreCommunity
            ),
            pros = review.pros,
            cons = review.cons,
            totalScore = review.totalScore,
            helpful = review.helpful,
            createdAt = review.createdAt
        )
    }
}
