/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../utils/fetchApi.js'
import Task from './Task.jsx';

const Home = () => {
  const [tasks, setTasks] = useState([])
  const { user, token } = useSelector(state => state.auth)
  const fetchTasks = async () => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const tasks = await request('/task/getall', "GET", headers)
    setTasks(tasks);
    console.log(tasks)
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className='w-full h-screen px-4'>
      <div className='w-full  px-2 flex flex-col  justify-between mt-[10rem]'>
        {tasks.length > 0 && <div className='text-center text-4xl mb-4'> Tasks Available</div>}
        {tasks.length > 0 && tasks?.map(task => { return <Task key={task?._id} task={task} /> })}
        {tasks.length == 0 && <div className='text-center text-4xl'>No tasks Available</div>}
      </div>
    </div>
  )
}

export default Home