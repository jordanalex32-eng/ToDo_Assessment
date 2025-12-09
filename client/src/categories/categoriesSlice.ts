import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import type {  PayloadAction  } from "@reduxjs/toolkit";
import type {  Category  } from "../../../shared/types";
import { api } from "../api";


interface CategoriesState {
  items: Category[];
  loading: boolean;
  error?: string;
}

const initialState: CategoriesState = {
  items: [],
  loading: false
};

export const fetchCategories = createAsyncThunk("categories/fetchAll", async () => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
});

export const createCategory = createAsyncThunk(
  "categories/create",
  async (name: string) => {
    const res = await api.post<Category>("/categories", { name });
    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.items.push(action.payload);
      });
  }
});

export default categoriesSlice.reducer;
