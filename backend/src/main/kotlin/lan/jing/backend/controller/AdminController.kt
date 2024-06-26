package lan.jing.backend.controller

import com.mybatisflex.kotlin.extensions.db.all
import com.mybatisflex.kotlin.extensions.db.deleteWith
import com.mybatisflex.kotlin.extensions.db.insert
import com.mybatisflex.kotlin.extensions.db.update
import com.mybatisflex.kotlin.extensions.kproperty.eq
import com.mybatisflex.kotlin.extensions.wrapper.whereWith
import lan.jing.backend.entry.Commodity
import lan.jing.backend.entry.Type
import lan.jing.backend.entry.User
import lan.jing.backend.mapper.CommodityMapper
import lan.jing.backend.mapper.OrderMapper
import lan.jing.backend.util.TimeUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin")
class AdminController {

    @Autowired
    lateinit var timeUtil: TimeUtil

    //User

    data class GetUsersResponse(
        val code: String,
        val message: String,
        val users: List<Map<String, String>>
    )

    @GetMapping("/user/getAll")
    fun getUsers(): GetUsersResponse {
        val users = all<User>()
        return GetUsersResponse(
            "200",
            "success",
            users.map {
                mapOf(
                    "id" to it.id.toString(),
                    "username" to it.username.toString(),
                    "password" to it.password.toString(),
                    "role" to it.role.toString(),
                    "date" to timeUtil.formatTime(it.date)
                )
            }
        )
    }

    data class EditUserRequest(
        val id: Int,
        val username: String,
        val password: String,
        val role: String
    )

    data class EditUserResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/user/edit")
    fun editUser(@RequestBody editUserRequest: EditUserRequest): EditUserResponse {
        kotlin.runCatching {
            update<User> {
                User::username set editUserRequest.username
                User::password set editUserRequest.password
                User::role set editUserRequest.role
                whereWith {
                    User::id eq editUserRequest.id
                }
            }
        }.onFailure {
            return EditUserResponse(
                "500",
                it.message.toString()
            )
        }

        return EditUserResponse(
            "200",
            "success"
        )
    }

    data class AddUserRequest(
        val username: String,
        val password: String
    )

    data class AddUserResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/user/add")
    fun addUser(@RequestBody addUserRequest: AddUserRequest): AddUserResponse {
        kotlin.runCatching {
            insert(
                User(
                    username = addUserRequest.username,
                    password = addUserRequest.password
                )
            )
        }.onFailure {
            return AddUserResponse("400", it.message.toString())
        }
        return AddUserResponse("200", "添加成功")

    }

    data class DeleteUserRequest(
        val id: Int
    )

    data class DeleteUserResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/user/delete")
    fun deleteUser(@RequestBody deleteUserRequest: DeleteUserRequest): DeleteUserResponse {
        kotlin.runCatching {
            deleteWith<User> {
                User::id eq deleteUserRequest.id
            }
        }.onFailure {
            return DeleteUserResponse(
                "500",
                it.message.toString()
            )
        }

        return DeleteUserResponse(
            "200",
            "success"
        )
    }

    //Type

    data class AddTypeRequest(
        val name: String
    )

    data class AddTypeResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/type/add")
    fun addType(@RequestBody addTypeRequest: AddTypeRequest): AddTypeResponse {
        kotlin.runCatching {
            insert(
                Type(
                    name = addTypeRequest.name
                )
            )
        }.onFailure {
            return AddTypeResponse(
                "500",
                it.message.toString()
            )
        }

        return AddTypeResponse(
            "200",
            "success"
        )
    }

    data class GetTypeResponse(
        val code: String,
        val message: String,
        val types: List<Map<String, String>>
    )

    @GetMapping("/type/getAll")
    fun getAllType(): GetTypeResponse {
        val types = all<Type>()
        return GetTypeResponse(
            "200",
            "success",
            types.map {
                mapOf(
                    "id" to it.id.toString(),
                    "name" to it.name.toString(),
                    "date" to timeUtil.formatTime(it.date)
                )
            }
        )
    }

    data class EditTypeRequest(
        val id: Int,
        val name: String
    )

    data class EditTypeResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/type/edit")
    fun editType(@RequestBody editTypeRequest: EditTypeRequest): EditTypeResponse {
        kotlin.runCatching {
            update<Type> {
                Type::name set editTypeRequest.name
                whereWith {
                    Type::id eq editTypeRequest.id
                }
            }
        }.onFailure {
            return EditTypeResponse(
                "500",
                it.message.toString()
            )
        }

        return EditTypeResponse(
            "200",
            "success"
        )
    }

    data class DeleteTypeRequest(
        val id: Int
    )

    data class DeleteTypeResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/type/delete")
    fun deleteType(@RequestBody deleteTypeRequest: DeleteTypeRequest): DeleteTypeResponse {
        kotlin.runCatching {
            deleteWith<Type> {
                Type::id eq deleteTypeRequest.id
            }
        }.onFailure {
            return DeleteTypeResponse(
                "500",
                it.message.toString()
            )
        }

        return DeleteTypeResponse(
            "200",
            "success"
        )
    }

    //Commodity

    data class GetCommoditiesResponse(
        val code: String,
        val message: String,
        val commodities: List<Map<String, String>>
    )

    @Autowired
    lateinit var commodityMapper: CommodityMapper

    @GetMapping("/commodity/getAll")
    fun getCommodities(): GetCommoditiesResponse {
        val commodities = commodityMapper.selectAllWithRelations()
        return GetCommoditiesResponse(
            "200",
            "success",
            commodities.map {
                mapOf(
                    "id" to it.id.toString(),
                    "name" to it.name,
                    "description" to it.description,
                    "pic" to it.pic,
                    "price" to it.price.toString(),
                    "type" to it.type?.name.toString(),
                    "date" to timeUtil.formatTime(it.date)
                )
            }
        )
    }

    data class AddCommodityRequest(
        val name: String,
        val description: String,
        val price: Double,
        val pic: String,
        val type: Int
    )

    data class AddCommodityResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/commodity/add")
    fun addCommodity(@RequestBody addCommodityRequest: AddCommodityRequest): AddCommodityResponse {
        kotlin.runCatching {
            commodityMapper.insertSelective(
                Commodity(
                    name = addCommodityRequest.name,
                    description = addCommodityRequest.description,
                    pic = addCommodityRequest.pic,
                    price = addCommodityRequest.price,
                    tid = addCommodityRequest.type
                )
            )
        }.onFailure {
            it.printStackTrace()
            return AddCommodityResponse(
                "500",
                it.message.toString()
            )
        }

        return AddCommodityResponse(
            "200",
            "success"
        )
    }

    data class EditCommodityRequest(
        val id: Int,
        val name: String,
        val description: String,
        val price: Double,
        val pic: String,
        val type: Int
    )

    data class EditCommodityResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/commodity/edit")
    fun editCommodity(@RequestBody editCommodityRequest: EditCommodityRequest): EditCommodityResponse {
        kotlin.runCatching {
            commodityMapper.update(
                Commodity(
                    id = editCommodityRequest.id,
                    name = editCommodityRequest.name,
                    description = editCommodityRequest.description,
                    pic = editCommodityRequest.pic,
                    price = editCommodityRequest.price,
                    tid = editCommodityRequest.type
                )
            )
        }.onFailure {
            return EditCommodityResponse(
                "500",
                it.message.toString()
            )
        }

        return EditCommodityResponse(
            "200",
            "success"
        )
    }

    data class DeleteCommodityRequest(
        val id: Int
    )

    data class DeleteCommodityResponse(
        val code: String,
        val message: String
    )

    @PostMapping("/commodity/delete")
    fun deleteCommodity(@RequestBody deleteCommodityRequest: DeleteCommodityRequest): DeleteCommodityResponse {
        kotlin.runCatching {
            commodityMapper.deleteById(
                deleteCommodityRequest.id
            )
        }.onFailure {
            return DeleteCommodityResponse(
                "500",
                it.message.toString()
            )
        }

        return DeleteCommodityResponse(
            "200",
            "success"
        )
    }


    //Order

    data class GetOrdersResponse(
        val code: String,
        val message: String,
        val orders: List<Map<String, String>>
    )

    @Autowired
    lateinit var orderMapper: OrderMapper

    @GetMapping("/order/getAll")
    fun getOrders(): GetOrdersResponse {
        val orders = orderMapper.selectAllWithRelations()
        return GetOrdersResponse(
            "200",
            "success",
            orders.map {
                mapOf(
                    "id" to it.id.toString(),
                    "pic" to it.commodity?.pic.toString(),
                    "commodity" to it.commodity?.name.toString(),
                    "user" to it.user?.username.toString(),
                    "date" to timeUtil.formatTime(it.date),
                    "address" to it.address.toString(),
                    "number" to it.number.toString()
                )
            }
        )
    }
}