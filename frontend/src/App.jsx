import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
function App() {
  const {check}=useAuthStore();
  useEffect(()=>{
    check();
  },[check]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
