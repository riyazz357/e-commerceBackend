import bcrypt from "bcrypt";
import mongoose, { model } from 'mongoose';

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
        required:true,
    }

},{timestamps:true})

//hash the password before saving

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
    
})



export const User=new mongoose.model("User",userSchema)