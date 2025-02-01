import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from './routes/Home.jsx';
import PostList from './routes/PostList.jsx';
import SinglePost from './routes/SinglePost.jsx';
import CreateBlog from './routes/CreateBlog.jsx';
import Signup from './routes/Signup.jsx';
import Signin from './routes/Signin.jsx';
import Layout from './layout/Layout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <Layout />} >
      <Route path='/' element={ <Home /> } />
      <Route path='/posts' element={ <PostList /> } />
      <Route path='/:slug' element={ <SinglePost /> } />
      <Route path='/create' element={ <CreateBlog /> } />
      <Route path='/signup' element={ <Signup /> } />
      <Route path='/signin' element={ <Signin /> } />
      {/* <Route path='/not' element={} /> */}
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
