import mongoose, { mongo } from "mongoose";
import validator from "validator";

const reservationSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"The name should be of atleast 3 characters"],
        maxLength:[20,"The name is too long"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"The name should be of atleast 3 characters"],
        maxLength:[20,"The name is too long"],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please enter a valid Email "]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Please enter a valid Mobile number"],
        maxLength:[10,"Please enter a valid Mobile number"],
    },
    time:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
});

export const Reservation = mongoose.model("Reservation",reservationSchema);