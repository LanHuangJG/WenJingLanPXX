package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import com.mybatisflex.annotation.Table
import java.time.LocalDateTime

@Table("cart")
data class Cart(
    @Id(keyType = KeyType.Auto)
    var id: Int?=null,
    var cid: Int,
    var uid: Int,
    var date: LocalDateTime,
    var count: Int
)
