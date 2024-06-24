package lan.jing.backend.controller

import jakarta.servlet.http.HttpServletRequest
import net.coobird.thumbnailator.Thumbnails
import org.dromara.x.file.storage.core.FileInfo
import org.dromara.x.file.storage.core.FileStorageService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import java.io.InputStream


@RestController
@RequestMapping("/file")
class FileDetailController {
    @Autowired
    private val fileStorageService: FileStorageService? = null //注入实列

    /**
     * 上传文件
     */
    @PostMapping("/upload")
    fun upload(file: MultipartFile?): FileInfo {
        return fileStorageService!!.of(file).upload()
    }

    /**
     * 上传文件，成功返回文件 url
     */
    @PostMapping("/upload2")
    fun upload2(file: MultipartFile?): String {
        val fileInfo: FileInfo? = fileStorageService!!.of(file)
            .setPath("upload/") //保存到相对路径下，为了方便管理，不需要可以不写
            .setObjectId("0") //关联对象id，为了方便管理，不需要可以不写
            .setObjectType("0") //关联对象类型，为了方便管理，不需要可以不写
            .putAttr("role", "admin") //保存一些属性，可以在切面、保存上传记录、自定义存储平台等地方获取使用，不需要可以不写
            .upload() //将文件上传到对应地方
        return if (fileInfo == null) "上传失败！" else fileInfo.url
    }

    /**
     * 上传图片，成功返回文件信息
     * 图片处理使用的是 https://github.com/coobird/thumbnailator
     */
    @PostMapping("/upload-image")
    fun uploadImage(file: MultipartFile?): FileInfo {
        return fileStorageService!!.of(file)
            .image { img: Thumbnails.Builder<out InputStream?> ->
                img.size(
                    1000,
                    1000
                )
            } //将图片大小调整到 1000*1000
            .thumbnail { th: Thumbnails.Builder<out InputStream?> ->
                th.size(
                    200,
                    200
                )
            } //再生成一张 200*200 的缩略图
            .upload()
    }

    /**
     * 上传文件到指定存储平台，成功返回文件信息
     */
    @PostMapping("/upload-platform")
    fun uploadPlatform(file: MultipartFile?): FileInfo {
        return fileStorageService!!.of(file)
            .setPlatform("aliyun-oss-1") //使用指定的存储平台
            .upload()
    }

    /**
     * 直接读取 HttpServletRequest 中的文件进行上传，成功返回文件信息
     * 使用这种方式有些注意事项，请查看文档 基础功能-上传 章节
     */
    @PostMapping("/upload-request")
    fun uploadPlatform(request: HttpServletRequest?): FileInfo {
        return fileStorageService!!.of(request).upload()
    }
}
