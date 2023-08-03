/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { taskSchema } from '../Schemas'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/authSlice'
import { request } from '../utils/fetchApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CreateTask = () => {
    const { user, token } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        title: "",
        desc: ""
    }
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: taskSchema,
        onSubmit: async (values) => {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            console.log(values)

            const data = await request(
                '/task/create',
                "POST",
                headers, { ...values, status: false, author: user._id }
            )
            console.log(data)

            // dispatch(signup(data))
            navigate('/')
        }
    })
    return (
        <div onSubmit={handleSubmit}>
            <div className=" flex flex-col items-center justify-center w-full h-screen">
                <form action="" className=" flex flex-col items-center justify-center border border-amber-500 p-8">
                    <h2 className='text-center text-xl'>Create Task</h2>
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
                    {errors.title && touched.title ? <p>{errors.title}</p> : null}
                    <input
                        type="text"
                        placeholder='description'
                        name='desc'
                        autoComplete='off'
                        value={values.desc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='border border-amber-500 p-2 mt-1 mb-4'
                    />
                    {errors.desc && touched.desc ? <p>{errors.desc}</p> : null}

                    <input
                        type="submit"
                        name='password_confirm'
                        value='submit'
                        autoComplete='off'
                        className='button-6 '
                    />

                </form>
            </div>
        </div>
    )
}

export default CreateTask