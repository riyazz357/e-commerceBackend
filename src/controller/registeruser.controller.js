import {User} from '../model/user.model.js'

const registerUser= async(req,res)=>{
    try{
        const {username,email,fullname,password}=req.body;

        if(!username || !email || !fullname || !password){
            return res
            .status(400)
            .json({message:"All field are required"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res
            .status(409)
            .json({message:"username or Email already exist"});
        }
        const user= await User.create({
            fullname,
            email,
            username,
            password
        });

        const createUser= await User.findById(user._id).select
        ("-password");

        return res
        .status(201)
        .json({message:"user created successfully",user:createUser})
    }
    catch(error){
        return res
        .select(500)
        .json({message:"Internal server error",error});
    }
}

export {registerUser}