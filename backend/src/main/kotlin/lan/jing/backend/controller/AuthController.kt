package lan.jing.backend.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController {

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
        if(loginRequest.username=="admin" && loginRequest.password=="admin"){
            return LoginResponse("200", "登录成功", "token")
        }
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
        return RegisterResponse("200", "注册成功")
    }
}