"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function FormTask() {
    const [tittle, setTittle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(tittle, description)
        const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,{
            method: "POST",
            body: JSON.stringify({tittle, description}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await res.json()
        console.log(data)
        router.refresh()
    }
    return (
        <div className='bg-slate-200 p-7 h-fit'>

            <form onSubmit={handleSubmit}>
                <h1 className='text-black font-bold '>Add Task</h1>
                <label htmlFor="tittle" className='text-xs text-black'>Tittle:</label>
                <input type="text" name='tittle'
                    className='bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900' onChange={e => setTittle(e.target.value)} />
                <label htmlFor="tittle" className='text-xs text-black'>Description:</label>
                <textarea name="description" id=""
                    className='bg-slate-400 rounded-md text-slate-900 p-2 mb-2 block w-full' onChange={e => setDescription(e.target.value)}></textarea>
                <button className='bg-indigo-500 text-white rounded-md p-2 block w-full font-bold'>Save</button>
            </form>

        </div>
    )
}

export default FormTask
