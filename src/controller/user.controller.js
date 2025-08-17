import {User} from '../model/user.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//registering user
const registerUser= async(req,res)=>{
    try{
        //get user detail from req.body
        const {username,email,fullname,password}=req.body;

        // validate that any filed is not empty in case
        if(!username || !email || !fullname || !password){
            return res
            .status(400)
            .json({message:"All field are required"});
        }

        //checking if user already exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res
            .status(409)
            .json({message:"username or Email already exist"});
        }
        // creating a user and password will be hashed
        const user= await User.create({
            fullname,
            email,
            username,
            password
        });
        //removing password from the response
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


//after registering logging the user
const loginUser= async(req,res)=>{

    try{
        const{username,email,password}=req.body;

        if(!username || !email || !password){
            return res
            .status(400)
            .json({message:'please enter all the field'})
        }
        const user=await User.findOne({$or :[{email},{username}]});

        if(!user){
            return res
            .status(400)
            .json({message:"user not found"})
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res
            .status(401)
            .json({message:'invalid password!!!'})
        }

        const token=jwt.sign(
            {
                _id:user._id,
                email:user.email,
                username:user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1D'
            }
        );
        const options={
            httpOnly:true,
            secure:process.env.NODE_ENV=== 'production'
        }

        const loggedInUser= await User.findById(user._id).select(
            "-password"
        )
        return res
        .status(200)
        .cookie("token",token,options) //set the cookie
        .json({
        message:"User logged in successfully",
        user:loggedInUser,
        token:token,
    });
    }
    catch(error){
        return res
        .status(500)
        .json({message:'Server error while login',error})
    }
}

//logout the user

const logoutUser= await(req,res)=>{

}



export {registerUser,loginUser}