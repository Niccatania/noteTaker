const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
const PORT= process.env.PORT || 3001
var uniqid = require("uniqid");
let db = require("./db/db.json");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Get our notes.html from public
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname , './public/notes.html'))
 
 });

//  Get our index.html from public
 app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , './public/index.html'))
 
 });
 
//  Get our notes
 app.get("/api/notes", (req,res) => {
   res.json(db)});

// recieve note and post it to Db file
app.post('/api/notes', (req,res)=>{
  const myNewNote = req.body;
  myNewNote.id = uniqid(myNewNote.id);
  db.push(myNewNote);
fs.writeFile("db/db.json", JSON.stringify(db), (err)=>{
      if (err) throw err;
  }); 
  res.json(myNewNote);
});

// Deleting note by reading the index, using splice to remove elements from the db and then rewriting to file 

app.delete("/api/notes/:id", (req, res) => {
  const deleteNote = db.findIndex((note) => note.id == req.params.id);
  db.splice(deleteNote, 1);
  let DB = JSON.stringify(db);
    fs.writeFile('db/db.json', DB, err => { if (err) throw err });
  res.json(db);
});



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
