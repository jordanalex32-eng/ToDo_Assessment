import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  fetchCategories,
  createCategory
} from "./categories/categoriesSlice";

import {
  fetchTodos,
  createTodo,
  deleteTodo,
  toggleTodoStatus,
  updateTodo,
  setFilters
} from "./todos/todosSlice";

import type { Todo } from "../../shared/types";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector(s => s.categories);
  const { items: todos, filters, loading } = useAppSelector(s => s.todos);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("");
  const [todoCategoryId, setTodoCategoryId] = useState<string | undefined>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodos(filters));
  }, [dispatch, filters]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    dispatch(createCategory(newCategoryName.trim()));
    setNewCategoryName("");
  };

  const handleAddTodo = () => {
    if (!todoTitle.trim()) return;
    dispatch(
      createTodo({
        title: todoTitle.trim(),
        description: todoDescription.trim() || undefined,
        dueDate: todoDueDate || undefined,
        categoryId: todoCategoryId
      })
    );
    setTodoTitle("");
    setTodoDescription("");
    setTodoDueDate("");
    setTodoCategoryId(undefined);
  };

  const handleToggle = (todo: Todo) => {
    dispatch(toggleTodoStatus(todo));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo) => {
    const newTitle = window.prompt("Edit title", todo.title);
    if (!newTitle || !newTitle.trim()) {
      return;
    }

    const newDescription = window.prompt(
      "Edit description",
      todo.description ?? ""
    );

    dispatch(
      updateTodo({
        ...todo,
        title: newTitle.trim(),
        description: (newDescription ?? "").trim()
      })
    );
  };

  const getCategoryName = (id?: string | null) =>
    categories.find(c => c.id === id)?.name ?? "No category";

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Todo Assessment</h1>
        <p className="app-subtitle">
          Plan, prioritise, and close your tasks with a clear overview.
        </p>
      </header>

      <main className="layout">
        {/* LEFT SIDE: categories + filters */}
        <section className="panel panel--side">
          <h2>Categories</h2>
          <div className="category-input">
            <input
              placeholder="New category"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
            />
            <button type="button" onClick={handleAddCategory}>
              Add
            </button>
          </div>
          <ul className="category-list">
            <li
              className={!filters.categoryId ? "active" : ""}
              onClick={() => dispatch(setFilters({ categoryId: undefined }))}
            >
              All
            </li>
            {categories.map(c => (
              <li
                key={c.id}
                className={filters.categoryId === c.id ? "active" : ""}
                onClick={() => dispatch(setFilters({ categoryId: c.id }))}
              >
                {c.name}
              </li>
            ))}
          </ul>

          <h3>Filters</h3>
          <div className="filters">
            <select
              value={filters.status}
              onChange={e =>
                dispatch(setFilters({ status: e.target.value as any }))
              }
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={e =>
                dispatch(setFilters({ sortBy: e.target.value as any }))
              }
            >
              <option value="createdAt">Created</option>
              <option value="dueDate">Due date</option>
            </select>
          </div>
        </section>

        {/* RIGHT SIDE: new todo + list */}
        <section className="panel panel--main">
          <h2>New Todo</h2>
          <div className="todo-form">
            <div className="todo-form-row">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                placeholder="Title"
                value={todoTitle}
                onChange={e => setTodoTitle(e.target.value)}
              />
            </div>

            <div className="todo-form-row">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Description"
                value={todoDescription}
                onChange={e => setTodoDescription(e.target.value)}
              />
            </div>

            <div className="todo-form-bottom">
              <div className="todo-form-row">
                <label htmlFor="dueDate">Due date</label>
                <input
                  id="dueDate"
                  type="date"
                  value={todoDueDate}
                  onChange={e => setTodoDueDate(e.target.value)}
                />
              </div>

              <div className="todo-form-row">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={todoCategoryId ?? ""}
                  onChange={e =>
                    setTodoCategoryId(e.target.value || undefined)
                  }
                >
                  <option value="">(none)</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="todo-form-actions">
                <button type="button" onClick={handleAddTodo}>
                  Add Todo
                </button>
              </div>
            </div>
          </div>

          <div className="todos-header">
            <h2>Todos</h2>
            <span className="todos-meta">
              {todos.filter(t => t.status === "active").length} active •{" "}
              {todos.filter(t => t.status === "completed").length} completed
            </span>
          </div>

          {loading && <p className="loading">Loading…</p>}

          <ul className="todo-list">
            {todos.map(t => (
              <li
                key={t.id}
                className={`todo-item ${
                  t.status === "completed" ? "done" : ""
                }`}
              >
                <div className="todo-main">
                  <div className="todo-title-row">
                    <strong>{t.title}</strong>
                    <span className="todo-badge">
                      {getCategoryName(t.categoryId)}
                    </span>
                    <span
                      className={`todo-status-badge ${
                        t.status === "completed" ? "completed" : "active"
                      }`}
                    >
                      {t.status === "completed" ? "Completed" : "Active"}
                    </span>
                  </div>
                  {t.description && (
                    <p className="todo-description">{t.description}</p>
                  )}
                  <small className="todo-meta">
                    Created: {new Date(t.createdAt).toLocaleString()}
                    {t.dueDate &&
                      ` • Due: ${new Date(
                        t.dueDate
                      ).toLocaleDateString()}`}
                  </small>
                </div>
                <div className="todo-actions">
                  <button type="button" onClick={() => handleToggle(t)}>
                    {t.status === "completed" ? "Mark Active" : "Mark Done"}
                  </button>
                  <button type="button" onClick={() => handleEdit(t)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(t.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
