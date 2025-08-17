import { Router } from "express";
import{
    registerUser,
    loginUser,
    logoutUser,
    changePassword,
    updateUserProfile,
    getUserProfile
} from "../controllers/userController.js";

import {verifyJWT} from "../middleware/authMiddleware.js";

const router=Router();

//public routes which doesn't require authentication
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//router that require user to be login. so need to verify using the verifyJWT middleware
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/changePassword").post(verifyJWT,changePassword);
router.route("/updateProfile").patch(verifyJWT,updateUserProfile);
router.route("/getProfile").get(verifyJWT,getUserProfile);


export default router;