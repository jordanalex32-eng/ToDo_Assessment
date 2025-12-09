import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import type { Todo } from "../../../shared/types";

export type TodoStatus = "active" | "completed";



export interface TodoFilters {
  status: "all" | "active" | "completed";
  sortBy: "createdAt" | "dueDate";
  categoryId?: string;
}

interface TodosState {
  items: Todo[];
  loading: boolean;
  error?: string;
  filters: TodoFilters;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  filters: {
    status: "all",
    sortBy: "createdAt"
  }
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchAll",
  async (filters: TodoFilters) => {
    const params: any = {
      status: filters.status === "all" ? undefined : filters.status,
      sortBy: filters.sortBy,
      categoryId: filters.categoryId
    };
    const res = await api.get<Todo[]>("/todos", { params });
    return res.data;
  }
);

export const createTodo = createAsyncThunk(
  "todos/create",
  async (payload: {
    title: string;
    description?: string;
    dueDate?: string;
    categoryId?: string;
  }) => {
    const res = await api.post<Todo>("/todos", payload);
    return res.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async (todo: Todo) => {
    const res = await api.put<Todo>(`/todos/${todo.id}`, todo);
    return res.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/delete", async (id: string) => {
  await api.delete(`/todos/${id}`);
  return id;
});

export const toggleTodoStatus = createAsyncThunk(
  "todos/toggleStatus",
  async (todo: Todo) => {
    const newStatus: TodoStatus = todo.status === "active" ? "completed" : "active";
    const res = await api.patch<Todo>(`/todos/${todo.id}/status`, { status: newStatus });
    return res.data;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<TodoFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(toggleTodoStatus.fulfilled, (state, action: PayloadAction<Todo>) => {
        const idx = state.items.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  }
});

export const { setFilters } = todosSlice.actions;
export default todosSlice.reducer;
