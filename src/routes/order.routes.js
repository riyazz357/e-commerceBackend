import { Router } from "express";
import { getOrders,
    createOrder,
    orderStatusUpdate
 } from "../controller/order.controller";
import {verifyJWT,isAdmin} from "../middleware/auth.middleware.js";

const router=Router();
//all acions are protected and require login

router.use(verifyJWT);

router.route("/").post(createOrder).
router.route("/").get(getOrders);

//only admin can update order status
router.route("/:orderId").put(isAdmin,orderStatusUpdate);

export default router;