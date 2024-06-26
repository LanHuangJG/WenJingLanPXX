package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import com.mybatisflex.annotation.Table
import java.time.LocalDateTime

@Table("user")
data class User(
    @Id(keyType = KeyType.Auto)
    var id: Int? = null,
    var username: String? = null,
    var password: String? = null,
    var date: LocalDateTime? = null,
    var role: String? = null
)
