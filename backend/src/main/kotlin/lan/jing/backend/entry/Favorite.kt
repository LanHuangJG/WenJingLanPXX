package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import java.time.LocalDateTime

data class Favorite(
    @Id(keyType = KeyType.Auto)
    val id: Int,
    val cid: Int,
    val uid: Int,
    val date: LocalDateTime,
)
