import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import UserModel from "../models/user.model.js";

async function isProductOwnerAdmin(req, res, next) {
  try{
    const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "no token found" });
  }
  const decoded = jwt.verify(token, config.JWT_SECRET);
    
  

  const id = decoded.id;

  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({ message: "no user found" });
  }

  if (user.role !== "seller") {
    return res.status(403).json({
      message: "acces denied",
    });
  }
  req.user = user;
  next();
  }catch(error){
    return  res.status(401).json({ message: "invalid or expired token" });
  }
}
export { isProductOwnerAdmin };
