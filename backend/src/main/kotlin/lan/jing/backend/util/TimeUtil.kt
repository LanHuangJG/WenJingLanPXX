package lan.jing.backend.util

import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Component
class TimeUtil {

    fun formatTime(dateTime: LocalDateTime?): String =
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(dateTime)
}