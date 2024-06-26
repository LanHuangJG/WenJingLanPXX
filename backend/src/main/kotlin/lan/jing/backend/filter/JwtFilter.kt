package lan.jing.backend.filter

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import lan.jing.backend.entry.User
import lan.jing.backend.util.JwtUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.OncePerRequestFilter

class JwtFilter : OncePerRequestFilter() {
    @Autowired
    lateinit var jwtUtil: JwtUtil


    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val token: String? = request.getHeader("token")
        if (token != null) {
            val id = jwtUtil.verifyJwt(token)?.claims?.get("id")?.asString()
            val username = jwtUtil.verifyJwt(token)?.claims?.get("username")?.asString()
            val role = jwtUtil.verifyJwt(token)?.claims?.get("role")?.asString()
            SecurityContextHolder.getContext().authentication =
                UsernamePasswordAuthenticationToken(
                    User(
                        id = id?.toInt(),
                        username = username,
                        role = role
                    ),
                    null, null
                )
        }
        filterChain.doFilter(request, response)
    }
}