import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import { RouteIndex } from './helpers/RouteName'
import Index from './pages/Index'

const App = () => {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App