import mongoose from 'mongoose';


const cartItem=new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }

})

const shoppingCartSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    item:{
        type:[cartItem],
        default:[]
    }
},{timestamps:true})

export const shoppingCartModel = mongoose.model('shoppingCart', shoppingCartSchema);