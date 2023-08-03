/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { request } from '../utils/fetchApi'
import UpdateTask from './UpdateTask'
import trash from '../assets/trash.png'
import edit from '../assets/pencil.png'

const Task = (task) => {
    const navigate = useNavigate()

    const handleUpdateTask = () => {
        navigate(`/update/${task.task._id}`)
    }
    const handleDeleteTask = () => {
        navigate(`/delete/${task.task._id}`)
    }
    return (
        <div className={`p-2 border border-black text-center ${task.task.status ? "opacity-20" : "opacity-100"}`}>
            <div className="w-full flex flex-col">
                <div className="">
                    Title: {task?.task?.title}
                </div>
                <div>
                    Description: {task?.task?.desc}
                </div>
                <div>
                    Status: {task?.task?.status === true ? "completed" : "pending"}
                </div>
                <div className='flex items-center justify-around p-2 '>
                    <button className='button-6' onClick={handleDeleteTask}><img src={trash} alt="" /></button>
                    <button className='button-6' onClick={handleUpdateTask}><img src={edit} alt="" /></button>
                </div>
            </div>
        </div>
    )
}

export default Task