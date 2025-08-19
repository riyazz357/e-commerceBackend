import { connect } from "mongoose";
import { Category } from "../model/category.model.js";
import { Product } from "../model/products.model.js";

const createProduct= async(req,res)=>{
    try{
        const {name,description,price,category,stock}=req.body();

        if(!name || !description || !price || !category || !stock){
            return res
            .status(400)
            .json({message:"Please fill all the fields."});
        }
        const imageLocalPath=req.file?.path;
        if(!imageLocalPath){
            return res
            .status(400)
            .json({message:"Please upload an image."});
        }
        const imageUrl=imageLocalPath;
        const product= await Product.create({
            name,
            description,
            price,
            category,
            stock,
            productImages:[imageUrl]
     })
     return res
     .status(201)
     .json({message:"product created successfully",product});

    }catch(error){
        return res
        .status(500)
        .json({message:"server error while creating product",error:error.message});
    }
}

//get all product 

const getAllProducts= async(req,res)=>{
    try {
        const {category,search}=req.query;
        let query={}
        if(category){
            query.category=category;
        }
        if(search){
            query.name={ $regex: search, $options: 'i' } //case insensitive
        }

        const sortBy=req.query.sortBy || 'createdAt';
        const sortOrder=req.query.sortOrder==="desc"?-1:1;
        const sortOptions={[sortBy]:sortOrder};

        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;

        const products= await Product
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('category','name');

        const totalProducts=await Product.countDocuments(query);


        
        return res
        .status(200)
        .json({message:"All products fetched successfully",products,
            pagination:{
                totalProducts,
                totalPages:Math.ceil(totalProducts/limit),
                currentPage:page,
            }
        });

    }
    catch(error) 
    {
        return res
        .status(500)
        .json({message:"server error while getting all products",error:error.message});

    }
}

//updating the product
const updateProduct= async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,description,price,category,stock}=req.body;

        const updatedProduct= await Product.findByIdAndUpdate(id,{
            $set:{
                name,
                description,
                price,
                category,
                stock
            }
        },{new:true}).populate('category','name');

        if(!updatedProduct){
            return res
            .status(400)
            .json({message:"product not found!!"})
        }
        return res
        .status(200)
        .json({message:"product is updated successfylly!!",product:updatedProduct})

        
    } 
    catch (error) {
        return res
        .status(401)
        .json({message:"error while updating the product",error:error.message})
        
    }
}

//Deleting the product
const deleteProduct= async(req,res)=>{
    try{const {id}=req.params;
    const deleteProduct= await Product.finfByIdAndDelete(id);

    if(!deleteProduct){
        return res
        .status(401)
        .json({message:"product not foundd!!"})
    }

    return res
    .status(200)
    .json({message:"Product deleted successfully..."})
   

}catch(error){
    return res
    .status(501)
    .json({message:"server error while deleting the products.",error:error.message})

}
}



export {createProduct,getAllProducts,updateProduct,deleteProduct}