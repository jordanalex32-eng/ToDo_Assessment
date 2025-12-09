import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://todo-assessment-6716.onrender.com/api";

export const api = axios.create({ baseURL: API_BASE_URL });