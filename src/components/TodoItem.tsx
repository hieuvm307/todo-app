
import { useForm } from 'react-hook-form';
import ITodo from '../interface/todo';

interface ITodoItem {
  item:ITodo;
  index: number;
  onToggleCheckbox: (item: ITodo) => void;
  currentTodo: ITodo;
  onHandleSave: (data: any) => void;
  setCurrentTodo: (todo: ITodo) => void;
  onHandleRemoveTodo: (id: number) => void;
}

const TodoItem = ({
  item,
  index,
  onToggleCheckbox,
  currentTodo,
  onHandleSave,
  setCurrentTodo,
  onHandleRemoveTodo,
}: ITodoItem) => {
  const {reset,handleSubmit, register} = useForm();
  return (
    <div>
        <li key={index}>
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => onToggleCheckbox(item)}
            readOnly
          />
          {currentTodo.id === item.id ? (
            <form onSubmit={handleSubmit(onHandleSave)}>
              <input type="text" {...register("title-update")} />
              <button>Save</button>
              <button onClick={() => setCurrentTodo({} as ITodo)}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <span
                onClick={() => {
                  reset({ "title-update": item.title });
                  setCurrentTodo(item);
                }}
                style={
                  item.isCompleted ? { textDecoration: "line-through" } : {}
                }
              >
                {item.title}
              </span>
              <button onClick={() => onHandleRemoveTodo(item.id)}>Xóa</button>
            </>
          )}
        </li>
    </div>
  )
}

export default TodoItem
