// shared/types.ts

// ---- Core enums / unions ----
export type TodoStatus = "active" | "completed";
export type TodoFilter = "all" | "active" | "completed";

// ---- Entities shared by client & server ----
export interface Category {
  id: string;
  name: string;
  createdAt: string;      // ISO string
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string | null; // ISO string or null
  createdAt: string;
  status: TodoStatus;
  categoryId: string | null; // null = uncategorized
}

// ---- DTOs (payloads) for the API ----
export interface CreateTodoDto {
  title: string;
  description?: string;
  dueDate?: string | null;
  categoryId?: string | null;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string | null;
  categoryId?: string | null;
  status?: TodoStatus;
}
