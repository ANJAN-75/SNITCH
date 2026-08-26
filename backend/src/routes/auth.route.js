import {Router} from "express"
import {registerValidation} from "../validator/auth.validator.js"
const authRoute=Router()


//import controller
import { registerController} from "../controller/auth.controller.js"
/**
 * @route POST /api/auth/register
 * @description it expect email,password,contact,fullname,role["buyer","seller"]
 */

authRoute.post("/register",registerValidation, registerController)

export default authRoute
