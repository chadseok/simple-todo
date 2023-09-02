import React from "react";
import { useLoaderData } from "react-router-dom";
import { createTodoApi } from "@/api/todo";
import type { TodoData } from "@/lib/types/main";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todoList, setTodoList] = React.useState(useLoaderData() as TodoData[]);
  const [todoText, setTodoText] = React.useState("");

  const createTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await createTodoApi(todoText);
      setTodoList([...todoList, res.data]);
      setTodoText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-100 w-[36rem] h-[100vh] shadow-md overflow-auto">
      <h1 className="text-xl text-white p-4 bg-gray-900">투두</h1>
      <form
        className="relative p-4 border-b-2 border-dotted border-slate-300"
        onSubmit={createTodo}
      >
        <input
          className="w-full h-12 bg-slate-300 rounded px-4 py-2"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          spellCheck={false}
        />
        <button
          className="absolute right-4 bg-slate-400 w-12 h-12 rounded-r hover:bg-slate-500"
          type="submit"
        >
          🖊️
        </button>
      </form>
      <div className="p-4">
        <ul>
          {todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              data={todo}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
