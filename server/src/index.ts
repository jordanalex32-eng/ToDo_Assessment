import express = require("express");
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import todosRouter from "../src/routes/todos.js";
import categoriesRouter from "../src/routes/categories.js";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Todo API running" });
});

app.use("/api/todos", todosRouter);
app.use("/api/categories", categoriesRouter);

// Basic error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Error:", err);
  res.status(400).json({ message: err.message ?? "Bad request" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
