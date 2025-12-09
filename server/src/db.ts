import type { Todo, Category } from "../../shared/types.js";

export let categories: Category[] = [];
export let todos: Todo[] = [];

export const db = {
  categories,
  todos,
};