package com.konomad.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class LoginRequest(
    @field:NotBlank(message = "이메일은 필수입니다")
    @field:Email(message = "올바른 이메일 형식이 아닙니다")
    val email: String,

    @field:NotBlank(message = "비밀번호는 필수입니다")
    val password: String
)

data class SignUpRequest(
    @field:NotBlank(message = "이메일은 필수입니다")
    @field:Email(message = "올바른 이메일 형식이 아닙니다")
    val email: String,

    @field:NotBlank(message = "비밀번호는 필수입니다")
    @field:Size(min = 6, message = "비밀번호는 6자 이상이어야 합니다")
    val password: String,

    @field:NotBlank(message = "이름은 필수입니다")
    val name: String
)

data class AuthResponse(
    val token: String,
    val user: UserResponse
)

data class UserResponse(
    val id: Long,
    val email: String,
    val name: String,
    val profileImage: String,
    val jobType: String
)
