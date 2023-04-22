import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
//
import { User } from "../schemas/User.js";
import { requireAuthorization } from "../middleware/authorizationToken.js";

const loginRoutes = express.Router();

loginRoutes.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).json({
      token,
      username: user.username,
      id: user._id,
      balance: user.balance,
    });
  } catch (error) {
    next(error);
  }
});

loginRoutes.get("/refecth", requireAuthorization, async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  try {
    const user = await User.findById(decodedToken.id);
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).json({
      token,
      username: user.username,
      id: user._id,
      balance: user.balance,
    });
  } catch (error) {
    next(error);
  }
});

export default loginRoutes;
