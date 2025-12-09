export type TodoStatus = "active" | "completed";
export type TodoFilter = "all" | "active" | "completed";
export interface Category {
    id: string;
    name: string;
    createdAt: string;
}
export interface Todo {
    id: string;
    title: string;
    description: string;
    dueDate: string | null;
    createdAt: string;
    status: TodoStatus;
    categoryId: string | null;
}
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
//# sourceMappingURL=types.d.ts.map