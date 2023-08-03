/* eslint-disable no-unused-vars */
import React from 'react'
import { useFormik } from 'formik'
import { signinSchema } from '../Schemas'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/authSlice'
import { request } from '../utils/fetchApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  }
  const notify = (message) => toast.error(`${message}`);
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      console.log(values)
      const options = { 'Content-Type': 'application/json' }
      console.log(values)
      const data = await request(
        '/auth/login',
        "POST",
        options, { ...values }
      )
      console.log(data)

      if (data.message) {
        notify(data.message)
        return;
      } else {
        console.log("Correct values")
        dispatch(signup(data))
        navigate('/')
      }
    }
  })
  return (
    <div onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className=" flex flex-col items-center justify-center w-full h-screen">
        <form action="" className=" flex flex-col items-center justify-center border border-amber-500 p-8">
          <h1 className='text-center text-xl'>Login</h1>
          <input
            type="text"
            placeholder='email'
            name='email'
            autoComplete='off'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='border border-amber-500 p-2 my-1'
          />
          {errors.email && touched.email ? <p className="text-center capitalize mb-2">{errors.email}</p> : null}

          <input
            type="password"
            placeholder='password'
            name='password'
            autoComplete='off'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className='border border-amber-500 p-2 my-1'
          />
          {errors.password && touched.password ? <p className="text-center capitalize mb-2">{errors.password}</p> : null}

          <input
            type="submit"
            name='password_confirm'
            value='submit'
            autoComplete='off'
          />

        </form>
      </div>
    </div>
  )
}

export default Signin