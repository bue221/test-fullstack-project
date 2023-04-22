import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// config
dotenv.config();
// middleware
import { handleErrors } from "./middleware/handleErrors.js";
import { notFound } from "./middleware/notFound.js";
// routes
import notesRouter from "./controllers/notes.js";
import usersRouter from "./controllers/users.js";
import loginRoutes from "./controllers/login.js";
import transactionsRouter from "./controllers/transactions.js";
import profileRouter from "./controllers/profile.js";

// connect to mongoDB
import "./lib/mongo.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", loginRoutes);
app.use("/api/transactions", transactionsRouter);
app.use("/api/profile", profileRouter);

// middleware para manejar errores
app.use(notFound);
app.use(handleErrors);

// run server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
