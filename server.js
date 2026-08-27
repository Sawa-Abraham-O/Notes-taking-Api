const express = require("express");
const path = require("path")
const env = require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3000

let notes = [];
let id_count = 1;

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

// TODO
/*
1. create a get request to fetch all notes
GET /notes


create a post request to create a note
POST /notes
2.

create a get request to fetch a single notes
GET /notes/:id3.

create a update request to update a note
UPDATE /notes/:id4.

create a delete request to delete a note
DELETE /notes/:id

*/

app.listen(PORT,()=>{
  console.log(`app is running on http://localhost:${PORT}`);
});
