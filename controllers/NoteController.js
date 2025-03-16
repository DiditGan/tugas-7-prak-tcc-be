import Note from "../models/NoteModel.js";

// Mendapatkan semua catatan
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan catatan baru
export const createNote = async (req, res) => {
  try {
    await Note.create(req.body);
    res.json({ message: "Yeay, berhasil menambahkan catatan!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate catatan yang ada
export const updateNote = async (req, res) => {
  try {
    await Note.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Nah, catatanmu berhasil diperbaharui yah!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus catatan yang ada
export const deleteNote = async (req, res) => {
  try {
    await Note.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Catatanmu berhasil dihapus yahh!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
