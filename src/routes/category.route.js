import Router from 'express';

import{
    getAllCategories,
    deleteCategory,
    updateCategory,
    createCategory,
} from '../controllers/categoryController.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router=Router();

//public route
router.route('/').get(getAllCategories)

//only admin can access this route
router.route('/').post(verifyJWT,createCategory)
router.route('/:id').delete(verifyJWT,deleteCategory)
router.route('/:id').patch(verifyJWT,updateCategory)