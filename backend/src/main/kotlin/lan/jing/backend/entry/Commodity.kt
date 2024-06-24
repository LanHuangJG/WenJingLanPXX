package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType

data class Commodity(
    @Id(keyType = KeyType.Auto)
    val id: Int,
    val name: String,
    val description: String,
    val price: Double,
    val pic: String
)
