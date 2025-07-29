import dotenv from "dotenv"
dotenv.config({
    path:"./env",
})

import express from "express";
import mongoose from "mongoose";
import {app} from "./app.js";
import {DB_name} from "./constans.js";
import connectDB from "./db/index.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT || 4500, ()=>{
        console.log(`server is running on port:${process.env.PORT || 8000}`)
    });

})
.catch((err) => {
    console.log("mongo db connection faileds")
})