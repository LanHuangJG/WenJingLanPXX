package lan.jing.backend.mapper

import com.mybatisflex.core.BaseMapper
import lan.jing.backend.entry.Order
import org.apache.ibatis.annotations.Mapper


@Mapper
interface OrderMapper : BaseMapper<Order>