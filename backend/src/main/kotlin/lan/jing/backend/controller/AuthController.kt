package lan.jing.backend.controller

import com.mybatisflex.kotlin.extensions.db.filterOne
import com.mybatisflex.kotlin.extensions.db.insert
import com.mybatisflex.kotlin.extensions.kproperty.eq
import lan.jing.backend.entry.User
import lan.jing.backend.util.JwtUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController {
    @Autowired
    lateinit var jwtUtil: JwtUtil


    data class LoginRequest(
        val username: String,
        val password: String
    )

    data class LoginResponse(
        val code: String,
        val message: String,
        val token: String
    )

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest): LoginResponse {
        val user = filterOne<User> {
            (User::username eq loginRequest.username)
                .and(User::password eq loginRequest.password)
        }
        if (user != null) return LoginResponse(
            "200", "登录成功",
            jwtUtil.generateJwt(user.id.toString(), user.username.toString(), user.role.toString())!!
        )
        return LoginResponse("400", "请检查用户名或密码是否正确", "")
    }


    data class RegisterRequest(
        val username: String,
        val password: String
    )

    data class RegisterResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/register")
    fun register(@RequestBody registerRequest: RegisterRequest): RegisterResponse {
        kotlin.runCatching {
            insert(
                User(
                    username = registerRequest.username,
                    password = registerRequest.password
                )
            )
            return RegisterResponse("200", "注册成功")
        }
        return RegisterResponse("400", "用户名已存在")
    }
}