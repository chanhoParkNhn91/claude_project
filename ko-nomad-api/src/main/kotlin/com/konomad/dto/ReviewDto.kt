package com.konomad.dto

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import java.time.LocalDateTime

data class ReviewScores(
    val cafeWork: Int,
    val internet: Int,
    val cost: Int,
    val transport: Int,
    val housing: Int,
    val nature: Int,
    val safety: Int,
    val community: Int
)

data class ReviewRequest(
    @field:NotBlank(message = "도시 slug는 필수입니다")
    val citySlug: String,

    @field:NotBlank(message = "체류 기간은 필수입니다")
    val stayDuration: String,

    @field:NotBlank(message = "체류 목적은 필수입니다")
    val stayPurpose: String,

    @field:NotBlank(message = "방문 시기는 필수입니다")
    val visitDate: String,

    @field:Min(1) @field:Max(5)
    val scoreCafeWork: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreInternet: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreCost: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreTransport: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreHousing: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreNature: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreSafety: Int = 3,

    @field:Min(1) @field:Max(5)
    val scoreCommunity: Int = 3,

    val pros: String = "",
    val cons: String = ""
)

data class ReviewResponse(
    val id: Long,
    val citySlug: String,
    val userId: Long?,
    val userName: String,
    val userImage: String,
    val stayDuration: String,
    val stayPurpose: String,
    val visitDate: String,
    val scores: ReviewScores,
    val pros: String,
    val cons: String,
    val totalScore: Double,
    val helpful: Int,
    val createdAt: LocalDateTime
)
