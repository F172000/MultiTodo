import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import ElevateAppBar from './components/header';
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<ElevateAppBar/>
    },
  ])
  return (
  <main>
<RouterProvider router={router}/>
  </main>
  );
}

export default App;
