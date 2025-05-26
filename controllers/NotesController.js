import { nanoid } from 'nanoid';
import { Note } from "../models/NoteModel.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({
            where: {
                userId: req.userId
            }
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ msg: "Title dan content wajib diisi" });
        }
        const note = await Note.create({ title, content, userId: req.userId });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.update(
            { title, content },
            {
                where: {
                    id: req.params.id,
                    userId: req.userId
                }
            }
        );
        if (note[0] === 0) {
            return res.status(404).json({ msg: "Note not found" });
        }
        res.json({ msg: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.destroy({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }
        res.json({ msg: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
