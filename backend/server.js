import app from "./src/app.js"
import { connectDb } from "./src/config/db.js"


connectDb();
app.listen(3000,()=>{
    console.log("app is listning on port 3000")
})