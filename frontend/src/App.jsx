import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'

const App = () => {
  return (
    <div className='bg-violet-100'>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Layout/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App