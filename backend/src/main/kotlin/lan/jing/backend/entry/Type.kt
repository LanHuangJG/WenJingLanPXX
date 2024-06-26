package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import com.mybatisflex.annotation.Table
import java.time.LocalDateTime

@Table("type")
data class Type(
    @Id(keyType = KeyType.Auto)
    var id: Int? = null,
    var name: String? = null,
    var date: LocalDateTime? = null
)
