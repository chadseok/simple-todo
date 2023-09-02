import axios from "axios";
import { API_PATH, USER_AUTH_TOKEN } from "@/lib/constants";
import { TodoData } from "@/lib/types/main";

export const todoInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

todoInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem(USER_AUTH_TOKEN);
    config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createTodoApi = (newTodo: string) => {
  return todoInstance.post(API_PATH.TODO, { todo: newTodo });
};

export const getTodosApi = () => {
  return todoInstance.get(API_PATH.TODO);
};

export const updateTodoApi = (newTodoData: TodoData) => {
  return todoInstance.put(`${API_PATH.TODO}/${newTodoData.id}`, {
    todo: newTodoData.todo,
    isCompleted: newTodoData.isCompleted,
  });
};

export const deleteTodoApi = (todoData: TodoData) => {
  return todoInstance.delete(`${API_PATH.TODO}/${todoData.id}`);
};
