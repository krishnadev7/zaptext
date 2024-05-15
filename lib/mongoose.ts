import mongoose from 'mongoose';

let isConnected = false;

export const connectToDb = async() => {
    mongoose.set('strictQuery',true);
    if(!process.env.MONGO_URL){
        return console.log("MongoDb url not added")
    }

    if(isConnected){
        return console.log("MongoDB already connected!")
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("MongoDB Connected successfully!");
        
    } catch (error) {
        console.log(error);
    }
}
