package com.konomad.service

import com.konomad.dto.AuthResponse
import com.konomad.dto.LoginRequest
import com.konomad.dto.SignUpRequest
import com.konomad.dto.UserResponse
import com.konomad.entity.User
import com.konomad.repository.UserRepository
import com.konomad.security.JwtTokenProvider
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtTokenProvider: JwtTokenProvider
) {

    fun signUp(request: SignUpRequest): AuthResponse {
        if (userRepository.findByEmail(request.email) != null) {
            throw IllegalArgumentException("이미 사용 중인 이메일입니다")
        }

        val user = userRepository.save(
            User(
                email = request.email,
                password = passwordEncoder.encode(request.password),
                name = request.name
            )
        )

        val token = jwtTokenProvider.generateToken(user.id, user.email)
        return AuthResponse(token = token, user = toUserResponse(user))
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.email)
            ?: throw IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다")

        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다")
        }

        val token = jwtTokenProvider.generateToken(user.id, user.email)
        return AuthResponse(token = token, user = toUserResponse(user))
    }

    fun getCurrentUser(userId: Long): UserResponse {
        val user = userRepository.findById(userId)
            .orElseThrow { NoSuchElementException("사용자를 찾을 수 없습니다") }
        return toUserResponse(user)
    }

    private fun toUserResponse(user: User): UserResponse {
        return UserResponse(
            id = user.id,
            email = user.email,
            name = user.name,
            profileImage = user.profileImage,
            jobType = user.jobType
        )
    }
}
