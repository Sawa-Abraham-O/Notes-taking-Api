const express = require("express");
const path = require("path")
const env = require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3000

let id_count = 1
let notes = [];


app.use(express.json());

// custom logger middleware
app.use((req,res,next)=>{
  console.log(`${req.method}  ${req.url} ${new Date().toString()}`);
  next();
});

// Api health check
app.get("/",(req,res)=>{
  res.json({message:"Notes taking api is running successfully"})
})


app.listen(PORT,()=>{
  console.log(`app is running on http://localhost:${PORT}`);
});
