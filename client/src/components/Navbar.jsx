/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logoutimg from '../assets/logout.png'
import { logout } from '../redux/authSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className='w-full h-[50px] px-4 bg-amber-400 '>
      <div className="w-full h-full px-2 flex items-center justify-around text-xl text-white">
        <div className=""><Link to='/'>MCS</Link></div>
        <ul className='flex items-center justify-between'>
          <li className='p-2'><Link to='/create'>Create</Link></li>
        </ul>
        <ul className='flex items-center justify-between'>
          {!user && <>
            <li className='p-2'><Link to='/login'>Login</Link></li>
            <li className='p-2'><Link to='/signup'>Signup</Link></li>
          </>}
          {user && <>
            <li className='p-2 capitalize'><Link to='/login'>{user?.name}</Link></li>
            <li className='p-2 cursor-pointer' onClick={handleLogout}><Link to='/signup'><img src={logoutimg} alt="" /></Link></li>
          </>}
        </ul>
      </div>
    </div>
  )
}

export default Navbar