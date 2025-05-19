const { required } = require("joi")
const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    adminId:{
        type:String,
        required:false
      },
    markasi :{
        type:String,
        required:[true,"Mashina markasi berilishi shart!"],
        minLength:[2,"Mashina markasi 2 ta belgidan kam bolmasligi kerak"],
        maxLength:[30,"Mashina markasi 30 ta belgidan kop bolmasligi kerak"],
        uniqe:true
        
    }, 
    categoryImg:{
        type:String,
        default : null,
        required: false
    
    }
} ,{ versionKey: false ,timestamps: true })
const categoryModels = mongoose.model("category", categorySchema)
module.exports = categoryModels