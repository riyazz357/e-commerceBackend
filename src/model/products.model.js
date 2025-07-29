import mongoose from 'mongoose';
import { Category } from './category.model';

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
    }
},{timestamps:true})

export const Product=new mongoose.model("Product",productSchema)