import {Category} from '../model/category.model.js';



const createCategory= async(req,res)=>{
    try{
        const {name,description}=req.body;

        if(!name){
            return res
            .status(400)
            .json({message:"category named is required"});
        }
        const existingCategory= await Category.findOne({name});
        if(existingCategory){
            return res
            .status(409)
            .json({message:"category already exist!!!"})
        }

        const category= await Category.create({
            name,
            description
        })

        return res
        .status(201)
        .json({message:"category created successfully!!!",category})
    }
    catch(error){
        return res
        .status(500)
        .json({message:"server error while creating category",error:error.message})
    }
}

const getAllCategories= async(req,res)=>{
    const {name,description}=req.body();

    if(!name || !category){
        return res
        .status(400)
        .json({message:"category name and category are required"});
    }
    const categories= await Category.find({name,description})
}


const updateCategory= async(req,res)=>{
    const{name,}
}




export {createCategory}