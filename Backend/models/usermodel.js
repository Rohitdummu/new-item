const mongoose = require("mongoose")
const schema = mongoose.Schema
const authschema = new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

const newmodl = mongoose.model("auth",authschema)

module.exports= newmodl