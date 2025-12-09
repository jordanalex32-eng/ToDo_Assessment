import axios from "axios";

const baseURL =
  // Prefer env variable when building / running
  import.meta.env.VITE_API_URL ??
  // Fallback to your hosted Render API
  "https://todo-assessment-6716.onrender.com/api";

export const api = axios.create({ baseURL });