package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType

data class User(
    @Id(keyType = KeyType.Auto)
    val id: Int,
    val username:String?=null,
    val password:String?=null,
)
