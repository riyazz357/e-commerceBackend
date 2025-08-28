import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app=express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieparser());

import userRouter from "./routes/user.router.js";
import { categoryRouter } from "./model/category.model.js";
import { ProductRouter } from "./model/products.model.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

app.use("/api/v1/users",userRouter);
app.use('/api/v1/categories',categoryRouter);
app.use("/api/v1/products",ProductRouter);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/orders",orderRouter);


export {app}