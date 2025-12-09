import express from "express";
import cors from "cors";
import todosRouter from "./routes/todos.js";
import categoriesRouter from "./routes/categories.js";
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
app.use((err, _req, res, _next) => {
    console.error("Error:", err);
    res.status(400).json({ message: err.message ?? "Bad request" });
});
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map