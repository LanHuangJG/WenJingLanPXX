package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import com.mybatisflex.annotation.RelationOneToOne
import com.mybatisflex.annotation.Table
import java.time.LocalDateTime

@Table("commodity")
data class Commodity(
    @Id(keyType = KeyType.Auto)
    var id: Int? = null,
    var name: String,
    var description: String,
    var price: Double,
    var pic: String,
    var tid: Int? = null,
    var date: LocalDateTime? = null,
    @RelationOneToOne(selfField = "tid", targetField = "id")
    var type: Type? = null
)
