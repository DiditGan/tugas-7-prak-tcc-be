import express from "express";
import { getUsers, register, login, logout } from "../controllers/UserController.js";
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/NotesController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/notes', verifyToken, getNotes);
router.get('/notes/:id', verifyToken, getNoteById);
router.post('/notes', verifyToken, createNote);
router.patch('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);

export default router;