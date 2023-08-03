/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { taskSchema } from '../Schemas'
import { useDispatch } from 'react-redux'
import { request } from '../utils/fetchApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import trash from '../assets/trash.png'

const DeleteTask = () => {
    const [task, setTask] = useState({})
    const { user, token } = useSelector(state => state.auth)
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const data = await request(`/task/delete/${id}`, "DELETE")
        navigate('/')
        console.log(data)
    }
    const fetchTask = async () => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        const data = await request('/task/getOneTask', "GET", headers, { id: id })
        console.log(data)
        setTask(data)
    }

    useEffect(() => { fetchTask() }, [])
    return (
        <div>
            <div className=" flex flex-col items-center justify-center">
                <div className="">
                    Title: {task?.title}
                </div>
                <div>
                    Description: {task?.desc}
                </div>
                <div>
                    Status: {task?.task?.status === true ? "completed" : "pending"}
                </div>
                <button className='button-6' onClick={handleDelete}><img src={trash} alt="" /></button>
            </div>
        </div>
    )
}

export default DeleteTask