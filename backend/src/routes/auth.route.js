import {Router} from "express"
import {registerValidation,loginValidator,} from "../validator/auth.validator.js"

const authRoute=Router()


//import controller
import { registerController,loginController,googleCallback} from "../controller/auth.controller.js"
import passport from "passport"
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

authRoute.get("/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] })
)

authRoute.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        // failureRedirect: config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleCallback,
)


export default authRoute
