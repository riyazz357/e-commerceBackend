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

app.use("/api/v1/users",userRouter);
app.use('/api/v1/categories',categoryRouter);


export {app}