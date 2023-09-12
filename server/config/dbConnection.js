import mongoose from "mongoose";

const connectDB=async(DATABASE_URL)=>{
    mongoose.set('strictQuery',false)
    try {
        const DB_OPTIONS={dbName:'zuqo'}
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("Database Connected...");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB