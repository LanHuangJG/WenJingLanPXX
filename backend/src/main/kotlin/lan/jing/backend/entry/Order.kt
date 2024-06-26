package lan.jing.backend.entry

import com.mybatisflex.annotation.Id
import com.mybatisflex.annotation.KeyType
import com.mybatisflex.annotation.RelationOneToOne
import com.mybatisflex.annotation.Table
import java.time.LocalDateTime

@Table("order")
data class Order(
    @Id(keyType = KeyType.Auto)
    var id: Int? = null,
    var cid: Int?=null,
    var uid: Int?=null,
    var date: LocalDateTime?=null,
    var address:String?=null,
    var number: Int?=null,
    @RelationOneToOne(selfField = "cid", targetField = "id")
    var commodity: Commodity?=null,
    @RelationOneToOne(selfField = "uid", targetField = "id")
    var user: User?=null
)
