import mongoose from 'mongoose';
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: { // Price at the time of order
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderItems:{
        type:[orderItemSchema],
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Shipped","Delivered","Cancelled"],
        default:"Pending"
    }
},{timestamps:true})

export const Order = mongoose.model('Order',orderSchema);