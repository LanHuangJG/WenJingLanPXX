package lan.jing.backend.util

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.JWTCreationException
import com.auth0.jwt.exceptions.JWTVerificationException
import com.auth0.jwt.interfaces.DecodedJWT
import org.springframework.stereotype.Component

@Component
class JwtUtil {
    private val algorithm: Algorithm = Algorithm.HMAC256("wenjing")

    fun generateJwt(id: String, username: String, role: String): String? {
        try {
            val token = JWT.create()
                .withIssuer("wenjing")
                .withClaim("id", id)
                .withClaim("username", username)
                .withClaim("role", role)
                .sign(algorithm)
            return token
        } catch (exception: JWTCreationException) {
            return null
        }
    }

    fun verifyJwt(token: String): DecodedJWT? {
        try {
            val verifier = JWT.require(algorithm) // specify any specific claim validations
                .withIssuer("wenjing") // reusable verifier instance
                .build()

            val decodedJWT = verifier.verify(token)
            return decodedJWT
        } catch (exception: JWTVerificationException) {
            return null
        }
    }
}