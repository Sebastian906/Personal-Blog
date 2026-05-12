import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import { RouteAddBlog, RouteAddCategory, RouteBlog, RouteBlogByCategory, RouteBlogDetails, RouteCategoryDetails, RouteCommentDetails, RouteEditBlog, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUsers } from './helpers/RouteName'
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
import SingleBlogDetails from './pages/SingleBlogDetails'
import BlogByCategory from './pages/blog/BlogByCategory'
import SearchResult from './pages/SearchResult'
import Comments from './pages/Comments'
import User from './pages/User'
import AuthRouteProtection from './components/AuthRouteProtection'
import OnlyAdminAllowed from './components/OnlyAdminAllowed'

const App = () => {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout/>}>
            <Route index element={<Index />} />
            <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
            <Route path={RouteSearch()} element={<SearchResult />} />
            <Route element={<AuthRouteProtection />}>
              <Route path={RouteProfile} element={<Profile />} />
              <Route path={RouteAddBlog} element={<AddBlog />} />
              <Route path={RouteBlog} element={<BlogDetails />} />
              <Route path={RouteEditBlog()} element={<EditBlog />} />
              <Route path={RouteCommentDetails} element={<Comments />} />
              <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
              <Route path={RouteUsers} element={<User />} />
            </Route>
            <Route element={<OnlyAdminAllowed />}>
              <Route path={RouteAddCategory} element={<AddCategory />} />
              <Route path={RouteEditCategory()} element={<EditCategory />} />
            </Route>
          </Route>
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App