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

//get all the categories

const getAllCategories= async(req,res)=>{
   try
   {
        const categories= await Category.find({});
        return res
        .status(200)
        .json({message:"categories fetched successfully!!!",categories})
   }catch(error){
    return res
    .status(500)
    .json({message:"server error while fetching categories",error:error.message})

   }
}


const updateCategory= async(req,res)=>{
    try{
        const{name,description}=req.body;
        const {id}=req.params;

        const updateCategory=await Category.findByIdAndUpdate(
            id,
            {name,description},
            {new:true}
        );
        if(!updateCategory){
            return res
            .status(404)
            .json({message:"category not found!!!"})
        }
        return res
        .status(200)
        .json({message:"category updated successfully!!!",updateCategory})

    }
    catch(error){
        return res
        .status(500)
        .json({message:"server error while updating category",error:error.message})
    }
}




export {createCategory}