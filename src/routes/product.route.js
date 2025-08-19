import { Router } from "express";
import {
    getAllProducts,
    deleteProduct,
    updatedProduct,
    createProduct
} from '../controller/product.controller';
import {verifyJWT,isAdmin} from '../middleware/auth.middleware.js';
import {upload} from '../middleware/multer.midlleware.js'


const router=Router();

router.route('/').get(getAllProducts);

//admin routes only

router.route("/").post(verifyJWT,isAdmin,upload.single('productImage'),createProduct);
router.route("/:id").patch(verifyJWT,isAdmin,updatedProduct);
router.route("/:id").delete(verifyJWT,isAdmin,deleteProduct)
