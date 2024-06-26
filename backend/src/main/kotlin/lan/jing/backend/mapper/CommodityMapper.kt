package lan.jing.backend.mapper

import com.mybatisflex.core.BaseMapper
import lan.jing.backend.entry.Commodity
import org.apache.ibatis.annotations.Mapper

@Mapper
interface CommodityMapper : BaseMapper<Commodity>