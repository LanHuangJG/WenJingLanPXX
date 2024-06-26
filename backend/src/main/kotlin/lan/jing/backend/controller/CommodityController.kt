package lan.jing.backend.controller

import com.mybatisflex.core.query.QueryWrapper
import com.mybatisflex.kotlin.extensions.db.all
import com.mybatisflex.kotlin.extensions.kproperty.eq
import com.mybatisflex.kotlin.extensions.wrapper.whereWith
import lan.jing.backend.entry.Commodity
import lan.jing.backend.entry.Order
import lan.jing.backend.entry.User
import lan.jing.backend.mapper.CommodityMapper
import lan.jing.backend.mapper.OrderMapper
import lan.jing.backend.util.TimeUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/commodity")
class CommodityController(
    private val commodityMapper: CommodityMapper, private val orderMapper: OrderMapper
) {

    data class GetCommoditiesResponse(
        val code: String, val message: String, val commodities: List<Commodity>
    )

    @GetMapping("/getAll")
    fun getCommodities(): GetCommoditiesResponse {
        val commodities = all<Commodity>()
        return GetCommoditiesResponse(
            "200", "success", commodities
        )
    }

    data class BuyCommodityRequest(
        val commodityId: String, val number: String, val address: String
    )

    data class BuyCommodityResponse(
        val code: String, val message: String
    )

    @PostMapping("/buy")
    fun buyCommodity(@RequestBody request: BuyCommodityRequest): BuyCommodityResponse {
        val usernamePasswordAuthenticationToken =
            SecurityContextHolder.getContext().authentication as UsernamePasswordAuthenticationToken
        val user = usernamePasswordAuthenticationToken.principal as User
        kotlin.runCatching {
            orderMapper.insertSelective(
                Order(
                    cid = request.commodityId.toInt(),
                    uid = user.id!!,
                    address = request.address,
                    number = request.number.toInt()
                )
            )
        }.onFailure {
            it.printStackTrace()
            return BuyCommodityResponse("400", it.message ?: "error")
        }
        return BuyCommodityResponse("200", "success")
    }

    //Order
    data class GetOrdersResponse(
        val code: String, val message: String, val orders: List<Map<String, String>>
    )

    @Autowired
    lateinit var timeUtil: TimeUtil

    @GetMapping("/getOrders")
    fun getOrders(): GetOrdersResponse {
        val user =
            (SecurityContextHolder.getContext().authentication as UsernamePasswordAuthenticationToken).principal as User
        val orders = orderMapper.selectListWithRelationsByQuery(QueryWrapper.create().whereWith {
                Order::uid eq user.id
            })
        return GetOrdersResponse("200", "success", orders.map {
            mapOf(
                "id" to it.id.toString(),
                "pic" to it.commodity?.pic.toString(),
                "commodity" to it.commodity?.name.toString(),
                "user" to it.user?.username.toString(),
                "date" to timeUtil.formatTime(it.date),
                "address" to it.address.toString(),
                "number" to it.number.toString()
            )
        })
    }

}