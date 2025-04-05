import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn.jsx';
import Home from "./pages/Home.jsx";
import DocumentScanner from './pages/DocumentScanner.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';
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
          <Route path="/" element={<Home />} />
          <Route path="/document-matching" element={<DocumentScanner />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/upload-document" element={<DocumentUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
