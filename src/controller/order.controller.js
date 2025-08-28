import { Order } from "../model/order.model.js";
import { Cart } from "../model/shoppingCart.model.js";
import { Product } from "../model/products.model.js";

const createOrder = async (req, res) => {
    // Create order from user's cart
    try{
        const userId = req.user._id;
        const { shippingAddress } = req.body;

        const cart= await Cart.findOne({user:userId})

        if(!cart || cart.items.length===0){
            return res
            .status(400)
            .json({message:"Cart is empty"});

        }
        // Calculate total price and prepare order items
        let totalPrice=0;
        const orderItems=[];
        for (const item of cart.items){
            const product= await Producut.findById(items.productId);
            if(!product){
                return res
                .status(400)
                .json({message:`Product with ID ${item.productId} not found`});
            }
            // Calculate price based on current product price
            totalPrice+=item.quantity*product.price;
            orderItems.push({
                productId:item.productId,
                quantity:item.quantity,
                price:product.price
            })

        }
        // clearing the user cart after order is placed
        const order= await Order.create({
            user:userId,
            orderItems,
            totalPrice,
            shippingAddress
        })

        await cart.findByIdAndDelete(cart._id);
        return res.status(201).json({message:"Order created successfully",order});

    

}
catch(error){
        return res
        .status(500)
        .json({message:"Internal Server Error",error:error.message});
    }

};


export {createOrder};
