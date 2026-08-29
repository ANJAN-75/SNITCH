import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new error(" MONGO_URI not in env file");
}
if (!process.env.JWT_SECRET) {
  throw new error("JWT_SECRET not in env file ");
}
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new error("GOOGLE_CLIENT_ID not in env file ");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new error("GOOGLE_CLIENT_SECRET not in env file");
}
if(!process.env.IMAGEKIT_PRIVATE_KEY){
  throw new error("IMAGEKIT_PRIVATE_KEY not in env file")
}

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY
};
