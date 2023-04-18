const express=require("express")
const server=express()
const bp=require("body-parser")
server.use(bp.json())
const mongoose=require("mongoose")
const cors = require("cors")
server.use(cors())
const authenticate = require("./routes/auth")

mongoose.connect("mongodb://localhost:27017/Sinon",{ useNewUrlParser: true} ).then((res)=>console.log("connected to db")).catch((err)=>console.log("failure"))
server.use("/",authenticate)

server.listen(3007,()=>console.log("server connected"))
