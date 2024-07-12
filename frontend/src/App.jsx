import React from "react"
import {Heading} from "./components/Heading"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    <Route path='/signin' element={<Signin></Signin>}></Route>
   
    <Route></Route>
    <Route></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
