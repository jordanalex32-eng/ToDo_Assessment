
import { Router } from "express";
import  { categories, todos } from "../db.js";
import type { Category } from "../../../shared/types.js";
import  { createId, requireField } from "../utils.js";

const router = Router();


router.get("/", (_req, res) => {
  res.json(categories);
});


router.post("/", (req, res, next) => {
  try {
    const name = requireField(req.body, "name");

    const category: Category = {
      id: createId(),
      name,
      createdAt: new Date().toISOString()
    };
    categories.push(category);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});


router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const category = categories.find(c => c.id === id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const name = requireField(req.body, "name");
    category.name = name;
    res.json(category);
  } catch (err) {
    next(err);
  }
});


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = categories.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: "Category not found" });


  todos.forEach(t => {
    if (t.categoryId === id) t.categoryId = null;
  });

  categories.splice(idx, 1);
  res.status(204).end();
});

export default router;
