import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { 
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

const App = () => {
 
  return (
    <>
    
      <BrowserRouter>

        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
        
      </BrowserRouter>
    
    </>
  )

};

export default App;