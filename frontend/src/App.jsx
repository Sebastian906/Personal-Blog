import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import { RouteAddBlog, RouteAddCategory, RouteBlog, RouteCategoryDetails, RouteEditBlog, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/RouteName'
import Index from './pages/Index'
import SignIn from './pages/Signin'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/category/AddCategory'
import EditCategory from './pages/category/EditCategory'
import CategoryDetails from './pages/category/CategoryDetails'
import AddBlog from './pages/blog/AddBlog'
import EditBlog from './pages/blog/EditBlog'
import BlogDetails from './pages/blog/BlogDetails'

const App = () => {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index />} />
            <Route path={RouteProfile} element={<Profile />} />
            {/** Categorias */ }
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            {/** Blogs */}
            <Route path={RouteAddBlog} element={<AddBlog />} />
            <Route path={RouteBlog} element={<BlogDetails />} />
            <Route path={RouteEditBlog()} element={<EditBlog />} />
          </Route>
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App