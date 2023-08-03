/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { taskSchema } from '../Schemas'
import { useDispatch } from 'react-redux'
import { request } from '../utils/fetchApi'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UpdateTask = () => {
    const { id } = useParams()
    const [taskStatus, setTaskStatus] = useState()
    const [task, setTask] = useState({})
    const { user, token } = useSelector(state => state.auth)
    const navigate = useNavigate();

    const initialValues = {
        title: "",
        desc: ""
    }
    const fetchTask = async () => {
        // const headers = {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json'
        // }
        const data = await request(`/task/getOneTask/${id}`, "GET")
        console.log(data)
        console.log(id)
        setTask(data)
    }
    useEffect(() => { fetchTask() }, [])
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: taskSchema,
        onSubmit: async (values) => {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            const body = { ...values, status: taskStatus == "done" ? true : false }
            console.log(body)

            const data = await request(
                `/task/update/${id}`,
                "PATCH",
                headers, { ...body, author: user._id }
            )
            // console.log(data)
            // setShowForm(false)
            navigate('/')
        }
    })
    return (
        <div onSubmit={handleSubmit}>
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
                <form action="" className=" flex flex-col items-center justify-center">
                    <input
                        type="text"
                        placeholder='title'
                        name='title'
                        autoComplete='off'
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='border border-amber-500 p-2 my-1'
                    />
                    {errors.title && touched.title ? <p className="text-center capitalize mb-2">{errors.title}</p> : null}
                    <input
                        type="text"
                        placeholder='description'
                        name='desc'
                        autoComplete='off'
                        value={values.desc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='border border-amber-500 p-2 my-1'
                    />
                    {errors.desc && touched.desc ? <p className="text-center capitalize mb-2">{errors.desc}</p> : null}
                    <select name="" id="" onChange={(e) => { setTaskStatus(e.target.value) }} className='border border-amber-500 p-2 my-1'>
                        <option value="not_done">not done</option>
                        <option value="done">done</option>
                    </select>
                    <input
                        type="submit"
                        name='password_confirm'
                        value='submit'
                        autoComplete='off'
                        className='button-6'
                    />

                </form>
            </div>
        </div>
    )
}

export default UpdateTask