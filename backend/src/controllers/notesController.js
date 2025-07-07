import Note from "../models/node.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes Controllers", error);
        res.status(500).json({message: "Internal server error"})
    }
}