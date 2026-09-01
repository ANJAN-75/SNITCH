import { body, validationResult } from "express-validator";

function validation(req,res,next){
  const error=validationResult(req)
  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})
  }
  next()

}

export const poductValidation = [
  body("title")
    .notEmpty()
    .withMessage("you must be add a valid name for product "),
  body("description")
    .notEmpty()
    .withMessage("you must be add valid description for product"),
  body("seller").isMongoId().withMessage("seller must be a valid mongoDb Id"),
  body("price.amount")
    .exists()
    .withMessage("price amount must be required for product")
    .isNumeric()
    .withMessage("price must be a numaric value"),
  body("price.currency")
    .isIn("USD", "EUR", "INR", "GBP", "JPY")
    .withMessage("price currency must be required for product"),
   

    validation
];
