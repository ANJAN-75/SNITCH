import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import passport from "passport"
import {  Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from "./config/config.js"
const app=express()


app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(passport.initialize())

passport.use(new GoogleStrategy({
  clientID:config.GOOGLE_CLIENT_ID,
  clientSecret:config.GOOGLE_CLIENT_SECRET,
  callbackURL:'/api/auth/google/callback'
},(accessToken, refreshToken, profile, done)=>{
  return done(null,profile)
}
))

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//use router
app.use("/api/auth",authRoute)
export default app;