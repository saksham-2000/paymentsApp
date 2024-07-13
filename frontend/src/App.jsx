import React from "react"
import {Heading} from "./components/Heading"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
import { Dashboard } from "./pages/Dashboard";



function App() {

  return (
   <BrowserRouter>
   <Routes>
   <Route path='/signin' element={<Signin></Signin>}></Route>
    <Route path='/signup' element={<Signup></Signup>}></Route>
    
    <Route path='/sendmoney' element={<SendMoney></SendMoney>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    
    <Route path="*" element={<Signin></Signin>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
