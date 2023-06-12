const express=require("express")
require('dotenv').config()
const cors =require("cors")
const {connection}=require("./db")
const {auth}=require("./Middleware/auth")
const {userRouter}=require("./Routes/user.router")
const {postRouter}=require("./Routes/notes.route")




const app=express()


app.use(express.json()) // inbuild middleware
app.use(cors())   //community Middelware


app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.send("HOME ROUTE")
})

app.use("/posts",auth,postRouter)
app.get("/logout",auth,(req,res)=>{
    req.headers.authorization="empty"
    res.send({"msg":"Logout successfully"})
})


app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log("Connected to DB")
    }catch(er){
console.log(er)
    }
console.log(`server is running at ${process.env.PORT}`)
})