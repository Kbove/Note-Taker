// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const uniqid = require('uniqid');
// const path = require('path');

// router.get('/api/notes', function(req, res) {
//     res.sendFile(path.join(__dirname, '../db/db.json'));
// })

// router.post('/api/notes', function(req, res){

//     var newNote = req.body;
//     var newID = uniqid();

//     newNote.id = newID;

//     fs.readFile('../db/db.json', (err, data) => {
//         if(err) throw err;
//         let dbFile = JSON.parse(data);
        
//         dbFile.push(newNote)
        
//         fs.writeFile('../db/db.json', JSON.stringify(dbFile), "utf8", err =>{
//             if(err) throw err;
//             console.log('saved data')
//         })
//     })
//     res.redirect('/notes');
// })

// router.delete('/api/notes/:id', function(req, res) {

//     let db = fs.readFileSync(path.join(__dirname, '../db/db.json'));
//     let dbFile = JSON.parse(db)
//     console.log(dbFile);

//     var selected = req.params.id;

//     for (let i = 0; i < dbFile.length; i++) {
//        if(dbFile[i].id.toString() === selected){
//            dbFile.splice(i,1);
//            break;
//        }
//     }

//    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(dbFile));

//    res.sendStatus(200);
// })

// module.exports = router;