import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Main from './components/main';
import ElevateAppBar from './components/header';
import BottomAppBar from './components/footer';
import CollapsibleTable from './components/view';
function App() {
  const router=createBrowserRouter([
    // {
    //   path:'/',
    //   element: <Main/>
    // },
    {
      path:'/',
      element:<ElevateAppBar/>
    },
    {
      path:'/view',
      element:<CollapsibleTable/>
    }
  ])
  return (
  <main>
<RouterProvider router={router}/>
  </main>
  );
}

export default App;
