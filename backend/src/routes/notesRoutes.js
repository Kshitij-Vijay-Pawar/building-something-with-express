import express from "express";
import { getAllNotes } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes)

router.get("/:id", (req, res) => {
    res.status(200).send("you are updating a note with id: " + req.params.id);
});



export default router;