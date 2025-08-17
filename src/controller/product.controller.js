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

export {createProduct}