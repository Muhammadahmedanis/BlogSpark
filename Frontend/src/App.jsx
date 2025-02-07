import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from './routes/Home.jsx';
import PostList from './routes/PostList.jsx';
import SinglePost from './routes/SinglePost.jsx';
import CreateBlog from './routes/CreateBlog.jsx';
import Signup from './routes/Signup.jsx';
import Signin from './routes/Signin.jsx';
import Otp from './routes/Otp.jsx';
import Layout from './layout/Layout.jsx';
import { useSelector } from 'react-redux';
import Dashboard from './Admin/routes/Dashboard.jsx';
import Blogs from './Admin/routes/blogs.jsx';
import SavedPosts from './routes/SavedPosts.jsx';
import Forgotpass from './routes/ForgotPass.jsx';
import NotFound from './routes/Notfound.jsx';
import ResetPassword from './routes/ResetPassword.jsx';
import MyBlog from './routes/MyBlog.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  // Redirect if user is not logged in
  if (!user?.name) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

const ProtectedRouteAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  
  // Redirect if user is not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={ <Layout />}>
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/signin' element={ <Signin /> } />
          <Route path='/otp' element={<Otp />} />
          <Route path='/forgotPass' element={<Forgotpass />} />
          <Route path='/change-password/:token' element={ <ResetPassword /> } />
          <Route path='*' element={ <NotFound /> } />
          
          <Route path='/' element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />

          <Route path='/allBlogs' element={ <PostList /> } />
          <Route path='/:slug' element={ <ProtectedRoute> <SinglePost /> </ProtectedRoute> } />
          <Route path='/write' element={ <ProtectedRoute> <CreateBlog /> </ProtectedRoute> } />
          <Route path='/myBlog' element={ <ProtectedRoute> <MyBlog /> </ProtectedRoute> } />
          <Route path='/savedPosts' element={ <ProtectedRoute> <SavedPosts /> </ProtectedRoute> } />

          <Route path='/dashboard' element={<ProtectedRouteAdmin> <Dashboard /> </ProtectedRouteAdmin>} />
          <Route path='/blogs' element={<ProtectedRouteAdmin> <Blogs />  </ProtectedRouteAdmin>} />
        </Route>

      </>
    )
  );

  return <RouterProvider router={router} />
}

export default App;
