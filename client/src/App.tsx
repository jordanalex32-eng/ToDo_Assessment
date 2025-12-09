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
  setFilters
  
} from "./todos/todosSlice";

import type {Todo} from "../../shared/types";



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
  };

  const handleToggle = (todo: Todo) => {
    dispatch(toggleTodoStatus(todo));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="app">
      <h1>Todo Assessment</h1>

      <section className="layout">
        <div className="panel">
          <h2>Categories</h2>
          <div className="category-input">
            <input
              placeholder="New category"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
            />
            <button onClick={handleAddCategory}>Add</button>
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
        </div>

        <div className="panel">
          <h2>New Todo</h2>
          <div className="todo-form">
            <input
              placeholder="Title"
              value={todoTitle}
              onChange={e => setTodoTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={todoDescription}
              onChange={e => setTodoDescription(e.target.value)}
            />
            <label>
              Due date:
              <input
                type="date"
                value={todoDueDate}
                onChange={e => setTodoDueDate(e.target.value)}
              />
            </label>
            <label>
              Category:
              <select
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
            </label>
            <button onClick={handleAddTodo}>Add Todo</button>
          </div>

          <h2>Todos</h2>
          {loading && <p>Loading…</p>}
          <ul className="todo-list">
            {todos.map(t => (
              <li key={t.id} className={t.status === "completed" ? "done" : ""}>
                <div>
                  <strong>{t.title}</strong>
                  {t.description && <p>{t.description}</p>}
                  <small>
                    Created: {new Date(t.createdAt).toLocaleString()}
                    {t.dueDate && ` • Due: ${new Date(t.dueDate).toLocaleDateString()}`}
                  </small>
                </div>
                <div className="todo-actions">
                  <button onClick={() => handleToggle(t)}>
                    {t.status === "completed" ? "Mark Active" : "Mark Done"}
                  </button>
                  <button onClick={() => handleDelete(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;
