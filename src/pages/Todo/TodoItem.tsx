import React from "react";
import { updateTodoApi, deleteTodoApi } from "@/api/todo";
import type { TodoData } from "@/lib/types/main";

type Props = {
  data: TodoData;
  todoList: TodoData[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoData[]>>;
};

function TodoItem(props: Props) {
  const [todoData, setTodoData] = React.useState(props.data);
  const [newTodo, setNewTodo] = React.useState(props.data.todo);
  const [editMode, setEditMode] = React.useState(false);

  const toggleCheckBox = async () => {
    try {
      const res = await updateTodoApi({
        ...todoData,
        isCompleted: !todoData.isCompleted,
      });
      setTodoData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  const editTodoText = async () => {
    try {
      const res = await updateTodoApi({ ...todoData, todo: newTodo });
      setTodoData(res.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setNewTodo(todoData.todo);
    setEditMode(false);
  };

  const deleteTodo = async () => {
    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await deleteTodoApi(todoData);
        props.setTodoList(
          props.todoList.filter((todo) => todo.id !== todoData.id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li
      className={`relative flex items-center h-12 p-2 mb-2 rounded ${
        todoData.isCompleted ? "bg-slate-50" : "bg-white"
      } hover:bg-slate-50`}
    >
      <input
        className="w-4 h-4 mr-4"
        name="todo"
        type="checkbox"
        onClick={toggleCheckBox}
        defaultChecked={todoData.isCompleted}
      />
      {editMode ? (
        <input
          className="bg-transparent border-none h-8 focus:outline-none"
          autoFocus
          spellCheck={false}
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
      ) : (
        <span
          className={`${
            todoData.isCompleted ? " line-through text-color-300" : ""
          }`}
        >
          {todoData.todo}
        </span>
      )}
      <div className="grow"></div>
      {editMode ? (
        <div>
          <button className="mr-4 text-sm" onClick={cancelEdit}>
            취소
          </button>
          <button className="mr-4 text-sm" onClick={editTodoText}>
            수정
          </button>
        </div>
      ) : (
        <div>
          <button className="mr-4" onClick={enterEditMode}>
            📝
          </button>
          <button className="mr-4" onClick={deleteTodo}>
            🗑️
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
