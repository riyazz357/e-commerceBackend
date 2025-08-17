import Router from 'express';

import{
    getAllCategories,
    deleteCategory,
    updateCategory,
    createCategory,
} from '../controllers/categoryController.js';
import { isAdmin, verifyJWT } from '../middleware/auth.middleware.js';

const router=Router();

//public route
router.route('/').get(getAllCategories)

//only admin can access this route
router.route('/').post(verifyJWT,isAdmin,createCategory)
router.route('/:id').delete(verifyJWT,isAdmin,deleteCategory)
router.route('/:id').patch(verifyJWT,isAdmin,updateCategory)