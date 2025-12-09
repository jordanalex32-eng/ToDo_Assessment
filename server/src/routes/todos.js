import { Router } from "express";
import { todos } from "../db.js";
import { createId, requireField, parseOptionalDate, getQueryParam } from "../utils.js";
const router = Router();
// GET /api/todos
router.get("/", (req, res, next) => {
    try {
        const statusParam = getQueryParam(req, "status");
        const sortBy = getQueryParam(req, "sortBy") ?? "createdAt";
        const categoryId = getQueryParam(req, "categoryId");
        let result = [...todos];
        if (statusParam && statusParam !== "all") {
            if (statusParam !== "active" && statusParam !== "completed") {
                throw new Error('Invalid "status" filter. Must be "all", "active", or "completed".');
            }
            result = result.filter(t => t.status === statusParam);
        }
        if (categoryId) {
            result = result.filter(t => t.categoryId === categoryId);
        }
        const field = sortBy === "dueDate" ? "dueDate" : "createdAt";
        result.sort((a, b) => {
            const av = a[field];
            const bv = b[field];
            // handle null dueDate
            if (!av && !bv)
                return 0;
            if (!av)
                return 1;
            if (!bv)
                return -1;
            return av.localeCompare(bv);
        });
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
// POST /api/todos
router.post("/", (req, res, next) => {
    try {
        const title = requireField(req.body, "title");
        const description = typeof req.body.description === "string" ? req.body.description.trim() : "";
        const dueDate = parseOptionalDate(req.body.dueDate, "dueDate");
        const rawCategoryId = req.body.categoryId;
        const categoryId = typeof rawCategoryId === "string" && rawCategoryId.trim() !== ""
            ? rawCategoryId.trim()
            : null;
        const todo = {
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
    }
    catch (err) {
        next(err);
    }
});
// PUT /api/todos/:id
router.put("/:id", (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = todos.find(t => t.id === id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        if (typeof req.body.title === "string") {
            const title = req.body.title.trim();
            if (!title) {
                throw new Error('Field "title" is required and must be a non-empty string.');
            }
            todo.title = title;
        }
        if (typeof req.body.description === "string") {
            todo.description = req.body.description.trim();
        }
        if ("dueDate" in req.body) {
            todo.dueDate = parseOptionalDate(req.body.dueDate, "dueDate");
        }
        if ("status" in req.body) {
            const status = req.body.status;
            if (status !== "active" && status !== "completed") {
                throw new Error('Field "status" must be "active" or "completed".');
            }
            todo.status = status;
        }
        if ("categoryId" in req.body) {
            const raw = req.body.categoryId;
            todo.categoryId =
                typeof raw === "string" && raw.trim() !== "" ? raw.trim() : null;
        }
        res.json(todo);
    }
    catch (err) {
        next(err);
    }
});
// DELETE /api/todos/:id
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1)
        return res.status(404).json({ message: "Todo not found" });
    todos.splice(idx, 1);
    res.status(204).end();
});
// PATCH /api/todos/:id/status
router.patch("/:id/status", (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = todos.find(t => t.id === id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        const status = requireField(req.body, "status");
        if (status !== "active" && status !== "completed") {
            throw new Error('Field "status" must be "active" or "completed".');
        }
        todo.status = status;
        res.json(todo);
    }
    catch (err) {
        next(err);
    }
});
export default router;
//# sourceMappingURL=todos.js.map