const express = require("express");
const fs = require("fs");
const notes = require("./NOTES.json");
const app = express(); 
const PORT = 3000;
app.use(express.static("../frontend"));

// middleware for handling the incoming notes data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// app.get('/', (req, res) => {
//     res.send("Hello, this is a simple note taking application");
// })

// Reading all Notes
app.route('/notes')
    .get((req, res) => {
        // Getting all notes
        return res.json(notes);
    })
    .post((req, res) => {
        // Creating a new note
        const body = req.body;
        const newId = notes.length ? notes[notes.length - 1].id + 1 : 1;
        notes.push({...body, id: newId});
        fs.writeFile('./NOTES.json', JSON.stringify(notes), (err) => {
            return res.json(notes);
        })
    })


// Getting a specific Note
app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id); 
    const note = notes.find((note) => note.id == id);
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    return res.json(note);
})

// Update a existing note
app.patch('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body; 

    // If user sends ID with node, its deleted before updating to prevent logic break
    delete updates.id;

    const note = notes.find((note) => note.id == id);
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }

    Object.assign(note, updates);

    fs.writeFile('./NOTES.json', JSON.stringify(notes), (err) => {
        return res.json(note);
    })
})

// Delete a existing note
app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    
    const index = notes.findIndex((note) => note.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Note not found" });
    }

    const deletedNote = notes.splice(index, 1)[0];

    fs.writeFile('./NOTES.json', JSON.stringify(notes), (err) => {
        return res.json({
            message : "note deleted",
            note: deletedNote
        })
    })
}) 

// Listening on local host port 3000

app.listen(3000, () => {
    console.log(`Server Started on port ${PORT}`);
})

