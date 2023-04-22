import express from "express";
import { requireAuthorization } from "../middleware/authorizationToken.js";
import { Profile } from "../schemas/Profile.js";
import { User } from "../schemas/User.js";
import jwt from "jsonwebtoken";
import { Transaction } from "../schemas/Transaction.js";

const profileRouter = express.Router();

profileRouter.get("/", requireAuthorization, async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  try {
    const profile = await Profile.find({ user: decodedToken.id });

    const data = {
      name: profile[0].name,
      avatarUrl: profile[0].avatarUrl,
      email: profile[0].email,
      phone: profile[0].phone,
    };
    Object.keys(data).forEach((key) =>
      data[key] === undefined ? delete data[key] : {}
    );
    const percent = (Object.keys(data).length / 4) * 100;

    res.status(200).json({ user: profile[0], percent });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

profileRouter.post("/", requireAuthorization, async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  try {
    const user = await User.findById(decodedToken.id);
    const profile = new Profile({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      avatarUrl: req.body.avatarUrl,
      user: user._id,
    });
    await profile.save();
    user.profile = profile._id;
    await user.save();

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
});

profileRouter.put("/", requireAuthorization, async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const profileData = req.body;

  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  try {
    const user = await User.findById(decodedToken.id);
    const profile = await Profile.find({ user: decodedToken.id });

    const data = {
      name: profile[0].name ?? profileData.name,
      avatarUrl: profile[0].avatarUrl ?? profileData.avatarUrl,
      email: profile[0].email ?? profileData.email,
      phone: profile[0].phone ?? profileData.phone,
    };
    Object.keys(data).forEach((key) =>
      data[key] === undefined ? delete data[key] : {}
    );
    const percent = (Object.keys(data).length / 4) * 100;

    console.log(percent, data);
    if (percent === 100 && !profile[0].completed) {
      const transaction = new Transaction({
        amount: 1000,
        date: new Date(),
        type: "reward",
        user: user._id,
      });
      await transaction.save();
      user.transactions = user.transactions.concat(transaction._id);
      user.balance = user.balance + transaction.amount;
      await user.save();
    }

    const profileUpdate = await Profile.findByIdAndUpdate(
      user.profile,
      { ...profileData, completed: percent === 100 ? true : false },
      {
        new: true,
      }
    );

    res.status(201).json({ profileUpdate });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default profileRouter;
