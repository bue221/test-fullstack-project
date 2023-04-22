import express from "express";
import { Note } from "../schemas/note.js";
import { User } from "../schemas/User.js";
import { requireAuthorization } from "../middleware/authorizationToken.js";
import jwt from "jsonwebtoken";

const notesRouter = express.Router();

notesRouter.get("/", requireAuthorization, (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get("/:id", requireAuthorization, async (req, res, next) => {
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

notesRouter.post("/", requireAuthorization, async (req, res) => {
  const note = req.body;
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!note) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }
  try {
    const user = await User.findById(decodedToken.id);
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

notesRouter.delete("/:id", requireAuthorization, async (req, res, next) => {
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

notesRouter.put("/:id", requireAuthorization, async (req, res, next) => {
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
