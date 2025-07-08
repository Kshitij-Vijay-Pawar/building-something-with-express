import Note from "../models/node.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); // newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes Controllers", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getAllNotesById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    }catch (error) {
        console.error("Error in getAllNotesById Controllers", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body
        const note = new Note({title, content})
        const savedNote = await note.save();
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in createNote Controllers", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {new: true}
        );
        if (!updateNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error in updateNote Controllers", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message:"note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote Controllers", error);
        res.status(500).json({message: "Internal server error"});
    }
}