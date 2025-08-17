import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';


const verifyJWT= async(req,res)=>{
    try{
        const token=req.cookies?.token || req.header("Authtorization")?.replace("Bearer","");

        if(!token){
            return res
            .status(401)
            .json({message:"Unauthorized request. No token"})
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decodedToken?.id).select("-password")

        if(!user){
            return res
            .status(401)
            .json({message:"ivalid token!! User not found"})
        }
        req.user=user
        next();
    }
    catch(error){
        return res
        .status(402)
        .json({message:"invalid or expireed token",error: error.message})
    }
};

const isAdmin= async(req,res)=>{
    if(req.user && req.user.role==='admin'){
        next();
    }
    else{
        return res
        .status(403)
        .json({message:"access denied!! Admin privilages required"})
    }
}

export {verifyJWT,isAdmin}