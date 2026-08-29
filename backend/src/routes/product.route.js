import {Router} from "express"
import {isProductOwnerAdmin} from "../middleware/auth.middleware.js"
import multer from "multer"

const productRoute=Router()

const storage=multer.memoryStorage()
const upload=multer({storage:storage})


/**
 * @route POST /api/product/
 * description it expect taitle,description,price{amount,currency},images.url
 */
  productRoute.post("/",upload.array("image",7),isProductOwnerAdmin)

export default productRoute


