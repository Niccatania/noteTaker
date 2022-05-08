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

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname , './public/notes.html'))
 
 });

 app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname , './public/index.html'))
 
 });
 
 app.get("/api/notes", (req,res) => {
   res.json(db)});


app.post('/api/notes', (req,res)=>{
  const myNewNote = req.body;
  myNewNote.id = uniqid(myNewNote.id);
  db.push(myNewNote);
fs.writeFile("db/db.json", JSON.stringify(db), (err)=>{
      if (err) throw err;
  });
  
  res.json(myNewNote);
});



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
