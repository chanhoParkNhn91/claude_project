package com.konomad.controller

import com.konomad.dto.AuthResponse
import com.konomad.dto.LoginRequest
import com.konomad.dto.SignUpRequest
import com.konomad.dto.UserResponse
import com.konomad.service.AuthService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {

    @PostMapping("/signup")
    fun signUp(@Valid @RequestBody request: SignUpRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.ok(authService.signUp(request))
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        return ResponseEntity.ok(authService.login(request))
    }

    @GetMapping("/me")
    fun getCurrentUser(authentication: Authentication): ResponseEntity<UserResponse> {
        val userId = authentication.principal as Long
        return ResponseEntity.ok(authService.getCurrentUser(userId))
    }
}
