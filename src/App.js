import logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom'
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Single } from './pages/Single';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './components/Footer';
import { Write } from './pages/Write';
import "./style.scss"
const Layout = ()=>{
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
const router = createBrowserRouter([
 { path: "/",
  element: <Layout></Layout>,
  children : [
    {
      path:"/",
      element : <Home></Home>
    },
    {
      path:"/post/:id",
      element : <Single></Single>
    },
    {
      path:"/write",
      element : <Write></Write>
    }
  ]
},
{
  path: "/register",
  element: <Register/>
},
{
  path: "/login",
  element: <Login/>
},
{
  path: "/signe",
  element: <Single/>
}
])
function App() {
  return (
    <div className="app">
      <div className='container'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
