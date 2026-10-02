import mongoose from 'mongoose'

export async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connection Successfuly");

    }catch(err){
        console.log("Database connection error",err);
        
    }
    
}