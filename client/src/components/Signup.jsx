/* eslint-disable no-unused-vars */
import React from 'react'
import { useFormik } from 'formik'
import { signupSchema } from '../Schemas'
import { useDispatch } from 'react-redux'
import { signup } from '../redux/authSlice'
import { request } from '../utils/fetchApi'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  }
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const options = { 'Content-Type': 'application/json' }
      console.log(values)
      const data = await request(
        '/auth/signup',
        "POST",
        options, { ...values }
      )
      console.log(data)

      dispatch(signup(data))
      navigate('/login')
    }
  })
  return (
    <div onSubmit={handleSubmit}>
      <div className=" flex flex-col items-center justify-center w-full h-screen">
        <form action="" className=" flex flex-col items-center justify-center border border-amber-500 p-8">
          <input
            type="text"
            placeholder='username'
            name='name'
            autoComplete='off'
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className='border border-amber-500 p-2 my-1'
          />
          {errors.name && touched.name ? <p className="text-center capitalize mb-2">{errors.name}</p> : null}
          <input
            type="text"
            placeholder='email'
            name='email'
            autoComplete='off'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className='border border-amber-500 p-2'

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
            type="password"
            placeholder='confirm password'
            name='confirm_password'
            autoComplete='off'
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            className='border border-amber-500 p-2 my-1'

          />
          {errors.confirm_password && touched.confirm_password ? <p className="text-center capitalize mb-2">{errors.confirm_password}</p> : null}

          <input
            type="submit"
            name='password_confirm'
            value='submit'
            className='border border-amber-500 p-2 my-1'
          />

        </form>
      </div>
    </div>
  )
}

export default Signup