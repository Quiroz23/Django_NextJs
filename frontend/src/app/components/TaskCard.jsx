"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'


function TaskCard({ task }) {
    const router = useRouter()
    const [edit, setEdit] = useState(false)
    const [newTittle, setNewTittle] = useState(task.tittle)
    const [newDescription, setNewDescription] = useState(task.description)
    const handleDelete = async (id) => {
        if (window.confirm('Quires eliminar esta tarea?')) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
                method: "DELETE"
            })
            if (res.status === 204) {
                router.refresh()
            }
        }
    }

    const handleUpdate = async (id) => {
        const res =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
            method: "PUT",
            body: JSON.stringify({
                tittle: newTittle,
                description: newDescription
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setNewTittle(data.tittle);
        setNewDescription(data.description);

        setEdit(!edit);
        
    }
    const handleTaskDone = async (id) => {
        console.log(id)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, {
            method: "POST",
        })
        if (res.status === 200) {
            router.refresh()
        }
    }

    return (
        <div className="bg-slate-700 p-4 w-full">
            <div
                className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex justify-between ">
                <div classsName="flex flex-col">
                    {
                        !edit ? (
                            <h2 className="font-bold">{newTittle}{task.done ? '✅' : ''}</h2>
                        ) : (
                            <input type="text" placeholder={task.tittle} className='p-2 bg-slate-500 border-none outline-none text-red-400' onChange={e => setNewTittle(e.target.value)} />
                        )
                    }

                    {
                        !edit ? (
                            <p>{task.description}</p>
                        ) : (
                            <textarea type="text" placeholder={task.description} className='p-2 bg-slate-500 border-none outline-none text-red-400 w-full'
                                rows={1} onChange={e => setNewDescription(e.target.value)} />
                        )
                    }
                </div>
                <div className="flex justify-between gap-x-2">
                    {
                        edit && (
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => handleUpdate(task.id)}>Guardar Cambios</button>
                        )
                    }
                    <button className={" text-white rounded-md p-2" + (task.done ? ' bg-green-500' : ' bg-gray-500')} onClick={() => handleTaskDone(task.id)}>{task.done ? 'Desmarcar' : 'Marcar'}</button>
                    <button className="bg-red-500 text-white rounded-md p-2" onClick={() => handleDelete(task.id)}>Eliminar</button>
                    <button className="bg-yellow-500 text-white rounded-md p-2" onClick={() => setEdit(!edit)}>Editar</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard;