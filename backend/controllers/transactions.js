import express from "express";
import { requireAuthorization } from "../middleware/authorizationToken.js";
import { Transaction } from "../schemas/Transaction.js";
import { User } from "../schemas/User.js";
import jwt from "jsonwebtoken";

const transactionsRouter = express.Router();

transactionsRouter.get("/", requireAuthorization, async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  try {
    const transactions = await Transaction.find({ user: decodedToken.id });
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
});

transactionsRouter.post("/", requireAuthorization, async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  try {
    const user = await User.findById(decodedToken.id);
    const transaction = new Transaction({
      amount: req.body.amount,
      date: new Date(),
      type: req.body.type,
      user: user._id,
    });
    await transaction.save();
    user.transactions = user.transactions.concat(transaction._id);
    user.balance = user.balance + transaction.amount;
    await user.save();
    res.status(200).json({ transaction, balance: user.balance });
  } catch (error) {
    next(error);
  }
});

export default transactionsRouter;
