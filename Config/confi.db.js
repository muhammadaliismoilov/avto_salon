const mongoose= require("mongoose")

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Atlas databazaga ulandi!");
    }catch(error){
        console.log("MongoDb databazaga ulanixda xatolik:" + error);
        
    }
}

module.exports = {
    connectDB
}


