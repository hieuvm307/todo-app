import ITodo from "./../interface/todo";
import TodoItem from "./TodoItem";

interface ITodoList {
  todo: ITodo[];
  onToggleCheckbox: (item: ITodo) => void;
  currentTodo: ITodo;
  onHandleSave: (data: any) => void;
  setCurrentTodo: (todo: ITodo) => void;
  onHandleRemoveTodo: (id: number) => void;
}

const TodoList = ({
  todo,
  onToggleCheckbox,
  currentTodo,
  onHandleSave,
  setCurrentTodo,
  onHandleRemoveTodo,
}: ITodoList) => {
  return (
    <ul>
      {todo.map((item: ITodo, index: number) => (
        <TodoItem
          item={item}
          index={index}
          onToggleCheckbox={onToggleCheckbox}
          currentTodo={currentTodo}
          onHandleSave={onHandleSave}
          setCurrentTodo={setCurrentTodo}
          onHandleRemoveTodo={onHandleRemoveTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
