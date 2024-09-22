import TaskCard from './TaskCard';
async function loadTask() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/tasks/`, {cache: 'no-cache'})
  const tasks = await res.json()
  console.log(tasks)
  return tasks

}

async function ListaTask() {
  const tasks = await loadTask()
  console.log(tasks)
  return (
    <div
      className='bg-slate-700 p-4 w-full'>
      <h1>Lista de tareas</h1>

      {tasks.map((task) => (

        <TaskCard task={task} key={task.id} />

      ))}



    </div >
  )
}

export default ListaTask
