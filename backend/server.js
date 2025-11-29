const express = require("express")
require("dotenv").config();
const mongoose = require("mongoose")
const app = express()


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to db and listening at port ${process.env.PORT}`);
        })
    }).catch(console.error(), () => {
        console.log(Error);
    });