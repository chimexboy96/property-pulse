import mongoose from 'mongoose';

let connected = false;

const connectDb= async () =>{
    mongoose.set('strictQuery', true)
    // mongoose.set('bufferTimeoutMS', 30000); // Increase timeout to 30 seconds


    // if database is already connected, don't connect again
    if (connected) {
        console.log('mongodb is already connected...')
        return
    }

    // connect to mongodb 
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        connected = true;
        console.log('mongoDb connected...')
    }catch(error){
        console.log(error)
    }



}

export default connectDb