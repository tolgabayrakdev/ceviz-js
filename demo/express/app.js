import express from "express";
import db from "./model.js";

const app = express();

app.use(express.json());



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    try {
        const users = await db.schemaService.getAll("users");
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error)
    }
});

app.post("/users", async (req, res) => {
    try {        
        const users = await db.create("users", req.body);
        res.status(201).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        const users = await db.schemaService.findById("users", req.params.id);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error)
    }
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});