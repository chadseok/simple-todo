import { getTodosApi } from "@/api/todo";

export const todoLoader = async () => {
  const res = await getTodosApi();
  return res.data;
};
