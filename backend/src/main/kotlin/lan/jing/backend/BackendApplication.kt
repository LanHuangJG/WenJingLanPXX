package lan.jing.backend

import org.dromara.x.file.storage.spring.EnableFileStorage
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@EnableFileStorage
class BackendApplication

fun main(args: Array<String>) {
	runApplication<BackendApplication>(*args)
}
