package com.konomad.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret}") private val secret: String,
    @Value("\${jwt.expiration}") private val expiration: Long
) {

    private val key: SecretKey by lazy {
        Keys.hmacShaKeyFor(secret.toByteArray())
    }

    fun generateToken(userId: Long, email: String): String {
        val now = Date()
        val expiryDate = Date(now.time + expiration)

        return Jwts.builder()
            .subject(userId.toString())
            .claim("email", email)
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(key)
            .compact()
    }

    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getUserIdFromToken(token: String): Long {
        val claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .payload

        return claims.subject.toLong()
    }
}
