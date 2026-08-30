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



// create  get request to fetch all notes
//GET /notes
  app.get("/notes",(req,res)=>{
  res.json({
  message:"All notes fetched successfully",
  notes:notes
  })
});



//create  post request to create a note
//POST /notes

app.post("/notes",(req,res)=>{
  const { title, content } = req.body;
    if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })};
  newNote = {
    "id":id_count,
    title,
    content,
    "createdAt":new Date().toString(),
    
  };
  
  notes.push(newNote);
  id_count += 1;
  res.status(201).json(newNote);
});

//create a get request to fetch a single notes
//GET /notes/:id3.
app.get("/notes/:id",(req,res)=>{
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if(!note){
    return res.status(404).json({
      message: "note not found"});
}
  res.json(note);
});
     
//create update request to update a note
//UPDATE /notes/:id
app.put("/notes/:id",(req,res)=>{
  const noteId = parseInt(req.params.id);
  const getNote= notes.find(note => note.id == noteId);
  if(!getNote){
    return res.status(404).json({
      message: "note not found"
    });
  }
  const {title, content} = req.body;
  getNote.title = title ?? getNote.title;
  getNote.content = content ?? getNote.content;
  getNote["updatedAt"] = new Date().toString();
  res.status(201).json(getNote);
});

//create delete request to delete a note
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
