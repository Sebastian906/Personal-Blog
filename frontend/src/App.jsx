import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import { RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/RouteName'
import Index from './pages/Index'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index />} />
            <Route path={RouteProfile} element={<Profile />} />
          </Route>
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App