import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Banner from './Banner.jsx'
import Navbar from './Navbar.jsx'
import Projects from './Projects.jsx'
import About from './About.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/banner",
    element: <Banner />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/about",
    element: <About />,
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
