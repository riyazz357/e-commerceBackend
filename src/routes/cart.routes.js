import { Router } from "express";

import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getCart);
router.route("/add").post(addToCart);
router.route("/remove/:productId").post(removeFromCart);

export default router;

