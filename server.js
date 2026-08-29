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

//1. create a get request to fetch all notes
//GET /notes
  app.get("/notes",(req,res)=>{
  res.json({
  message:"All notes fetched successfully",
  notes:notes
  })
});



//create a post request to create a note
//POST /notes

app.post("/notes",(req,res)=>{
  const newNote= req.body;

  if(Array.isArray(newNote)){
    notes.push(...newNote);
    return res.status(201).json({
      message: `${newNote.length} notes created successfully`,
      notes: newNote
    });
  }
   
  notes.push(newNote);
  res.status(201).json({
    message: "note created successfully",
    note: newNote
  });
});

//create a get request to fetch a single notes
//GET /notes/:id3.
app.get("/notes/:id",(req,res)=>{
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if(!note){
    return res.status(404).json({
      message: "note not found"

    })

  }
  res.json(note);
});
     

//create a update request to update a note
//UPDATE /notes/:id4.

app.put("/notes/:id",(req,res)=>{
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === noteId);
  if(noteIndex === -1){
    return res.status(404).json({
      message: "note not found"
    });
  }
  notes[noteIndex] = {
    ...notes[noteIndex],
    ...req.body
    };
  res.json({
    message: "note updated successfully",
    note: notes[noteIndex]
  });
});

//create a delete request to delete a note
//DELETE /notes/:id

app.delete("/notes/:id",(req,res)=>{
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === noteId);
  if(noteIndex === -1){
    return res.status(404).json({
      message: "note not found"
    });
  }
  notes.splice(noteIndex, 1);
  res.json({
    message: "note deleted successfully"
  });
});

app.listen(PORT,()=>{
  console.log(`app is running on http://localhost:${PORT}`);
});
