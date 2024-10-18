import React from "react";
import {BrowserRouter , Routes,Route} from "react-router-dom"
import Signup from './pages/signup';
import Login from './pages/login';
import Home from "./pages/Home";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/reset/:token' element={<Reset/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
