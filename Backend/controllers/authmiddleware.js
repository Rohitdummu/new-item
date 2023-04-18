const AuthModel=require("../models/usermodel")
let Controllers={}
const jtoken = require("jsonwebtoken")

Controllers.authorize = (req,res,next)=>{
    try{
        let tokdata = req.headers['authorization']
        if(!tokdata){
                res.send({msg:"YOU ARE NOT AUTHORIZED",status:false}).status(400) // no token found
        }
        const token=tokdata.replace("Bearer ",'') // to remove bearer
        //console.log(token)
        const verifiedtoken = jtoken.verify(token,'rohit')
        console.log(verifiedtoken) // it contains email issuer name iat and other info verifiedtoken.email
        req.token =  verifiedtoken  // sending to next function they can process it
        next()
        return
    }
    catch(err){
        console.log(err)
        res.send({msg:"INTERNAL SERVER ERROR",status:false}).status(500)
    }
}


module.exports = Controllers