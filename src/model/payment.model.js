import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    orderId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
        required: true,
    },
    transactionId: { 
        type: String,
        required: true,
        unique: true, 
    },
    paymentMethod: {
        type: String,
        enum: ['Card', 'NetBanking', 'UPI', 'Wallet'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending', 
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);