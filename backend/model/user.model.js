import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    credits:{
        type:Number,
        default:20
    },
    role:{
        type:String,
        default:"user"
    },
    lastCreditReset:{
        type: Date, default: Date.now()
    },
    totalScans:{
        type:Number,
        default:0
    }
});

const User=mongoose.model("User",userSchema);

export default User;