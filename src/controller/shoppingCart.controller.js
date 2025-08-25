import {ShoppingCart} from '../model/shoppingCart.model';
import { Product } from '../model/products.model';

const addToCart= async(req,res)=>{
    try{
        const{ProductId,quantity}=req.params;
        const userId=req.userId;

        let cart= await ShoppingCart.findOne({user:userId});
        if(!cart){
            cart= new cart({user:userId,items:[]});
        }

        const itemIndex=cart.items.findIndex(item=> item.ProductId.toString()===ProductId);
        if(itemIndex>-1){
            cart.items[itemIndex].quantity+=quantity;
        } else{
            cart.items.push({ProductId,quantity});
        }
        
        await cart.save();

        return res
        .status(200)
        .json({message:"Product added ti cart successfully",error:error.message})
    } catch(error){
        return res
        .status(501)
        .json({message:"server error while adding the product to cart",error:error.message})
    }
}

//get cart items
const getCartItems= async(req,res)=>{
    try{
        const userId=req.userId;
        const cart = await ShoppingCart.findOne({user:userId}).populate('items.ProductId','name price productImage');
        
        if(!cart){
            return res
            .status(200)
            .json({message:"Cart is empty",cartItems:[]});
        }

        return res
        .status(200)
        .json({message:"Cart items fetched successfully",cartItems:cart.items});

    }catch(error){
        return res
        .status(501)
        .json({message:"server error while fetching the cart items",error:error.message})
    }
} 

//remove cart item
const removeCartItem= async(req,res)=>{
    try{
        const{ProductId}=req.params;
        const userId=req.userId;

        const cart=await ShoppingCart.findOne({user:userId});
        if(!cart){
            return res
            .status(400)
            .json({message:"Cart not found"});
        }   
        cart.items=cart.items.filter(item=> item.ProductId.toString()!==ProductId);
        await cart.save();

    }catch(error){
        return res
        .status(501)
        .json({message:"server error while removing the cart item",error:error.message})
    }
}

export{addToCart,getCartItems,removeCartItem};