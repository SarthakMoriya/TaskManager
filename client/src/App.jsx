/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreateTask from './components/CreateTask'
import UpdateTask from './components/UpdateTask'
import { useSelector } from 'react-redux'
import DeleteTask from './components/DeleteTask'

export default function App() {
  const { user } = useSelector(state => state.auth)
  console.log(user)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Signin />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create' element={ <CreateTask /> } />
        <Route path='/update/:id' element={user ? <UpdateTask /> : <Signin />} />
        <Route path='/delete/:id' element={user ? <DeleteTask /> : <Signin />} />
      </Routes>
    </BrowserRouter>
  )
}