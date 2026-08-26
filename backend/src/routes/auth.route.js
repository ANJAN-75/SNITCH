import {Router} from "express"
import {registerValidation,loginValidator} from "../validator/auth.validator.js"
const authRoute=Router()


//import controller
import { registerController,loginController} from "../controller/auth.controller.js"
/**
 * @route POST /api/auth/register
 * @description it expect email,password,contact,fullname,role["buyer","seller"]
 */

authRoute.post("/register",registerValidation, registerController)

/**
 * @route POST /api/auth/login
 * @description it expect email,password
 */
authRoute.post("/login",loginValidator,loginController)


export default authRoute
