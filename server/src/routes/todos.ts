import { Router } from "express";
import { todos, categories } from "../db.js";
import type { Todo, TodoStatus } from "../../../shared/types.js";
import  {
  createId,
  requireField,
  parseOptionalDate,
  getQueryParam
} from "../utils.js";

const router = Router();


router.get("/", (req, res) => {
  let results = [...todos];

  const status = getQueryParam(req, "status");
  if (status === "active" || status === "completed") {
    results = results.filter(t => t.status === status);
  }

  const categoryId = getQueryParam(req, "categoryId");
  if (categoryId) {
    results = results.filter(t => t.categoryId === categoryId);
  }

  const sortBy = getQueryParam(req, "sortBy");
  if (sortBy === "dueDate" || sortBy === "createdAt") {
    results.sort((a, b) => {
      const av = a[sortBy] ?? "";
      const bv = b[sortBy] ?? "";
      return av.localeCompare(bv);
    });
  }

  res.json(results);
});


router.post("/", (req, res, next) => {
  try {
    const title = requireField(req.body, "title");
    const description = typeof req.body.description === "string" ? req.body.description : undefined;
    const dueDate = parseOptionalDate(req.body.dueDate, "dueDate");

    const categoryId = typeof req.body.categoryId === "string" ? req.body.categoryId : undefined;
    if (categoryId && !categories.some(c => c.id === categoryId)) {
      return res.status(400).json({ message: "Invalid categoryId" });
    }

    const todo: Todo = {
      id: createId(),
      title,
      description,
      dueDate,
      createdAt: new Date().toISOString(),
      status: "active",
      categoryId
    };

    todos.push(todo);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});


router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = todos.find(t => t.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const title = requireField(req.body, "title");
    const description = typeof req.body.description === "string" ? req.body.description : undefined;
    const dueDate = parseOptionalDate(req.body.dueDate, "dueDate");
    const status = req.body.status as TodoStatus | undefined;
    const categoryId = typeof req.body.categoryId === "string" ? req.body.categoryId : undefined;

    if (categoryId && !categories.some(c => c.id === categoryId)) {
      return res.status(400).json({ message: "Invalid categoryId" });
    }
    if (status && status !== "active" && status !== "completed") {
      return res.status(400).json({ message: "Invalid status" });
    }

    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    if (status) todo.status = status;
    todo.categoryId = categoryId;

    res.json(todo);
  } catch (err) {
    next(err);
  }
});


router.patch("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body as { status?: TodoStatus };
  if (status !== "active" && status !== "completed") {
    return res.status(400).json({ message: "status must be 'active' or 'completed'" });
  }
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.status = status;
  res.json(todo);
});
 

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: "Todo not found" });

  todos.splice(idx, 1);
  res.status(204).end();
});

export default router;
