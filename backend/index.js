const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const noteRoute = require("./routes/note.route.js");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", noteRoute);

app.get('/', (req, res) => {
    res.send("Server working");
});



mongoose.connect("mongodb+srv://username:<password>@cluster1.niv79tg.mongodb.net/Notes?retryWrites=true&w=majority&appName=Cluster1")
.then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
        console.log("Server running on port 3000")
    });
})
.catch((error) => {
    console.log("Connection failed", error);
});









