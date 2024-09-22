
import FormTask from './components/FormTask'
import ListaTask from './components/ListaTask'

export const dynamic = "force-dynamic";

function HomePage() {
  return (
    <div className='container mx-auto'>
      <h1>Task App</h1>
      <div className='flex gap-x-10'>

        <FormTask />
        <ListaTask />
      </div>


    </div>
  )
}

export default HomePage
