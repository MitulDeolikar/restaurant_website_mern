import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"RESTAURANT_WEBSITE",

    })
    .then(()=>{
        console.log("Connected to mongoDB successfully")
    }).catch((err)=>{
        console.log(`Following error occured -> ${err}`)
    })
}