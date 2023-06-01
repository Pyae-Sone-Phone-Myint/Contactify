import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/register/Register'
import Login from '../pages/login/Login'

const Path = () => {
  return (
    <>

      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default Path
