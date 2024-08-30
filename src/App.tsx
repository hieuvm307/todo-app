import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ITodo from "./interface/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const { reset } = useForm();
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [currentTodo, setCurrentTodo] = useState({} as ITodo);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3000/todo`);
      const data = await response.json();
      setTodo(data);
    })();
  }, []);

  const onHandleRemoveTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      if (response.status !== 200) return alert("xóa thất bại !");
      alert("xóa thành công !");
      setTodo(todo.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const onHandleSubmit = async (data: any) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, isCompleted: false }),
      });

      const result = await response.json();
      if (response.status !== 201) return alert("thêm nhiệm vụ thất bại !");
      alert("thêm nhiệm vụ thành công !");
      reset();
      setTodo([result, ...todo]);
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  };

  const onHandleSave = async (data: any) => {
    try {
      const response = await fetch(
        `http://localhost:3000/todo/${currentTodo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...currentTodo, title: data["title-update"] }),
        }
      );
      const result = await response.json();
      if (response.status !== 200) return alert("cập nhật thất bại !");
      alert("cập nhật thành công !");
      setTodo(todo.map((todo) => (todo.id === result.id ? result : todo)));
      setCurrentTodo({} as ITodo);
    } catch (error) {}
  };

  const onToggleCheckbox = async (data: any) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, isCompleted: !data.isCompleted }),
      });
      const result = await response.json();
      setTodo(todo.map((todo) => (todo.id === data.id ? result : todo)));
    } catch (error) {}
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onHandleSubmit={onHandleSubmit} />
      <hr />
      <TodoList
        todo={todo}
        onToggleCheckbox={onToggleCheckbox}
        currentTodo={currentTodo}
        onHandleSave={onHandleSave}
        setCurrentTodo={setCurrentTodo}
        onHandleRemoveTodo={onHandleRemoveTodo}
      />
    </div>
  );
};

export default App;
