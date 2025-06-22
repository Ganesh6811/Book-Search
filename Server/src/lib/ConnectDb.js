import mongoose from "mongoose";

const connectDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Error in the ConnectDb function:", err);
    }
}

export default connectDb;