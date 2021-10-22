const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3001;
const uniqid = require('uniqid');
// const notesRoutes = require('./routes/notesRoutes')
// const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// app.use(notesRoutes)
// app.use(htmlRoutes)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes',(req,res) =>{
    res.sendFile(path.join(__dirname,'/public/notes.html'));
})

app.get('/api/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})

app.post('/api/notes', function(req, res){

    var newNote = req.body;
    var newID = uniqid();

    newNote.id = newID;

    fs.readFile("./db/db.json", (err, data) => {
        if(err) throw err;
        let dbFile = JSON.parse(data);
        
        dbFile.push(newNote)
        
        fs.writeFile("./db/db.json", JSON.stringify(dbFile), "utf8", err =>{
            if(err) throw err;
            console.log('saved data')
        })
    })
    res.redirect('/notes');
})

app.delete("/api/notes/:id", function(req, res) {

    let db = fs.readFileSync(path.join(__dirname, "/db/db.json"));
    let dbFile = JSON.parse(db)
    console.log(dbFile);

    var selected = req.params.id;

    for (let i = 0; i < dbFile.length; i++) {
       if(dbFile[i].id.toString() === selected){
           dbFile.splice(i,1);
           break;
       }
    }

   fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(dbFile));

   res.sendStatus(200);
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
