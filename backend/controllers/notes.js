import express from "express";
import { Note } from "../schemas/note.js";
import { User } from "../schemas/User.js";

const notesRouter = express.Router();

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({
        error: "No se encontro la nota",
      });
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.post("/", async (req, res) => {
  const note = req.body;
  if (!note) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }
  try {
    const user = await User.findById(note.user);
    const newNote = new Note({
      content: note.content,
      important: note.important || false,
      date: new Date(),
      user: user._id,
    });

    const savedNote = await newNote.save();

    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    res.json(savedNote);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

notesRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({
        error: "No se encontro la nota",
      });
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const note = req.body;
  if (!note || !note.content) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }
  try {
    const res = Note.findByIdAndUpdate(id, note, { new: true });
    res.status(201).json(res);
  } catch (error) {
    next(error);
  }
});

export default notesRouter;
