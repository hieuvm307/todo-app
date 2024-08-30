import { useForm } from 'react-hook-form';
interface TodoForm {
    onHandleSubmit : (data: any) => void
}
const TodoForm = ({onHandleSubmit}: TodoForm) => {
    const {register, handleSubmit} = useForm();
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
        <input type="text" {...register("title")} />
        <button>Add</button>
      </form>
    </div>
  )
}

export default TodoForm
