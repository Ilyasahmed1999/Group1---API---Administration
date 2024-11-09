const express = require('express');
const dotenv = require('dotenv');
const prisma = require('./db/prisma');


//load environment variables
dotenv.config();

const app = express();

app.get('/', (req,res)=> {
    res.send("Home Page!");
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})

