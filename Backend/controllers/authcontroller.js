const AuthModel=require("../models/usermodel")
let Controllers={}
const bcrypt = require("bcrypt") 
const jtoken = require("jsonwebtoken")


Controllers.signup = async (req,res)=>{
    try{
        const {email,name,address} = req.body
        const data = req.body
        // const salt = await bcrypt.genSalt(5) // increase for more secure 5-15
        // console.log("salt",salt)
        const hashedpwd = await bcrypt.hash(data.password,5) // another method to generate hash and salt is give salt rounds as second argu 
        //console.log("hashedpwd",hashedpwd)
        const valid = await AuthModel.findOne({email})
        if(valid){
            res.send({msg:"email already existed?",status:false}).status(404)  // 404 for not found and 400 for authentication error
        }
        else{
            const result = await AuthModel.create({
                email,
                password:hashedpwd, // dont modify
                name,
                address,
                active:true
            })
            //res.send(result).status(200)
            res.send({msg:"signup done",status:true,response:result}).status(200)
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"failed signup?",status:false})  //.status(500) //500 for internal server error
    }
}
Controllers.signin = async (req,res)=>{
    const data = req.body
    const dbdata = await AuthModel.findOne({email:data.email})
    if(dbdata){
    try{
        const compare = await bcrypt.compare(data.password,dbdata.password)
        //res.send(result).status(200)
        if(compare){
            if(dbdata.active===true){
                const jwtoken = jtoken.sign({email:data.email},'rohit',{expiresIn:'1h',algorithm:'HS512',issuer:'rohit'})
                //console.log("tokn",jwtoken)
                res.send({msg:"yay u are in",status:true,token:jwtoken}).status(200)
            }
            else{
                res.send({msg:"Account Deactivated",status:false}).status(404)
            }
        }
        else{
            res.send({msg:"failed signin?",status:false}).status(400)
        }
    }
    catch(err){
        console.log(err)
    }
} 
else{
    res.send({msg:"user not existed?",status:false}).status(400)
}
}

Controllers.das = async (req,res)=>{
    try{
        const gotit = await AuthModel.findOne({email:req.token.email},{email:1,name:1,active:1}) //req.token.email
        console.log(gotit)
    if(gotit.active===true){
        res.send({msg:"geting successfully",status:true,response:gotit}).status(301)
    }
    else{
        res.send({msg:"Account Deactivated",status:false}).status(404)
    }
    }
    catch(err){
        console.log(err)
        res.send({msg:"failed geting data?",status:false}).status(404)
    }
}

Controllers.deleteuser = async (req,res)=>{
    const data2 = req.body // here through req body we have to send email and password
    const dbdata = await AuthModel.findOne({email:req.token.email})
    try{
        const compare = await bcrypt.compare(data2.password,dbdata.password)
        if(compare){
        const resp = await AuthModel.deleteOne({email:req.token.email}) // for delete also deleteMany, findByIdAndDelete("62bda337b220e79498d6b9d5")
        res.send({msg:"Account deleted successfully",status:true,response:resp}).status(200)
        }
        else{
            res.send({msg:"failed delete?",status:false}).status(404)
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"failed delete?",status:false}).status(404)
    }
}
Controllers.deactvuser = async (req,res)=>{
    const data2 = req.body
    const dbdata = await AuthModel.findOne({email:req.token.email})
    try{
        const compare = await bcrypt.compare(data2.password,dbdata.password)
        if(compare){
        const resp = await AuthModel.updateOne({email:req.token.email},{active:false}) // for delete also deleteMany, findByIdAndDelete("62bda337b220e79498d6b9d5")
        res.send({msg:"Account deactivated successfully",status:true,response:resp}).status(200)
        }
        else{
            res.send({msg:"failed deactive?",status:false}).status(404)
        }
    }
    catch(err){
        console.log(err)
        res.send({msg:"failed deactive?",status:false}).status(404)
    }
}
Controllers.updateuser = async (req,res)=>{
    const data2 = req.body
    try{
        const hashedpassword=await bcrypt.hash(data2.upassword,5)
        console.log(hashedpassword)
        const updated=await AuthModel.findOneAndUpdate({email:req.token.email},{password:hashedpassword})
        console.log(updated)
    if(updated){
        res.send({msg:"password updated successfully",status:true,response:updated}).status(200)
    }
    else{
        res.send({msg:"failed update?",status:false}).status(404)
    }
    }
    catch(err){
        console.log(err)
        res.send({msg:"failed update server error?",status:false}).status(404)
    }
}
Controllers.reactvuser = async (req,res)=>{
    const data2 = req.body
    const dbdata = await AuthModel.findOne({email:data2.email})
    try{
        //const compare = await bcrypt.compare(data2.password,dbdata.password)

        const resp = await AuthModel.updateOne({email:data2.email},{active:true}) // for delete also deleteMany, findByIdAndDelete("62bda337b220e79498d6b9d5")
        res.send({msg:"Account reactivated successfully",status:true,response:resp}).status(200)
        
        // else{
        //     res.send({msg:"failed reactive?",status:false}).status(404)
        // }
    }
    catch(err){
        console.log(err)
        res.send({msg:"failed reactive?",status:false}).status(404)
    }
}

Controllers.uppwd = async(req,res)=>{
    const data=req.body
    try{
        const hashedpassword=await bcrypt.hash(data.upassword,5)
        console.log(hashedpassword)
        const updated=await AuthModel.findOneAndUpdate({email:req.token.email},{password:hashedpassword})
        console.log(updated)
    if(updated){
        res.send({msg:"updated successfully",status:true}).status(301)
    }
    else{
        res.send({msg:"update failed",status:false}).status(404)
    }
    
}
    catch(err){
        console.log(err)
        res.send("updated err")
    }
}

module.exports = Controllers