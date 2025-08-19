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