import {body,validationResult} from "express-validator"


function validateRequest(req,res,next){
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({errors:err.array()})
    }
    next()
}


export const registerValidation=[
    body('email').isEmail().withMessage("plese provide a valid email"),
    body('fullname').trim().notEmpty().withMessage("name is required"),
    body('password').trim().isLength({min:6}).withMessage("min 6 digit password required "),
    body('contact').matches(/^\d{10}$/).withMessage("contact must be a 10 digit number"),
    body('isSeller').isBoolean().withMessage("isSeller must be a bollean value"),

    validateRequest
]

export const loginValidator=[
    body("email").isEmail().withMessage("must be provide a valid email"),
    body("password").trim().notEmpty().withMessage("must provide a password"),

    validateRequest
    
]