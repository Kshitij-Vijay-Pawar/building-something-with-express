import express from "express";
import { createNote, deleteNote, getAllNotes, getAllNotesById, updateNote } from "../controllers/notesController.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getAllNotesById); // Assuming you want to get a note by ID, you might want to create a separate function for that
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

// router.get("/:id", (req, res) => {
//     res.status(200).send("you are updating a note with id: " + req.params.id);
// });


export default router;