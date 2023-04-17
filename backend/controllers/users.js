import express from "express";
import { User } from "../schemas/User.js";
import bcrypt from "bcrypt";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    date: 1,
  });
  res.json(users);
});

usersRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("notes", {
      content: 1,
      date: 1,
    });
    if (user) {
      res.status(201).json({ user });
    } else {
      res.status(404).json({
        error: "No se encontro el usuario",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res) => {
  const user = req.body;
  if (!user || !user.username) {
    return res.status(400).json({
      error: "user info is missing",
    });
  }
  try {
    const passwordHash = await bcrypt.hash(user.password, 10);
    //
    const newUser = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    // next(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        error: "No se encontro el usuario",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
