import {Router} from "express"
import {isProductOwnerAdmin} from "../middleware/auth.middleware.js"
import {createProductController, showProductController} from "../controller/product.controller.js"
import {poductValidation} from "../validator/product.validator.js"
import multer from "multer"

const productRoute=Router()

const storage=multer.memoryStorage()
const upload=multer({storage:storage})


/**
 * @route POST /api/product/
 * @description it expect taitle,description,price{amount,currency},images.url
 */
  productRoute.post("/create",isProductOwnerAdmin,upload.array("images",7),createProductController)

/**
 * @route GET /api/product
 * @description it show product only seller (only seller product)
 */

productRoute.get("/",isProductOwnerAdmin,showProductController)

export default productRoute


