import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import DocumentUpload from './components/DocumentUpload.jsx';
import AdminPanel from "./pages/AdminPanel.jsx"
import RequestCredit from "./pages/RequestCredict.jsx";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import DocumentMatcher from "./pages/DocumentMatcher.jsx";

function App() {
  const { check } = useAuthStore();
  useEffect(() => {
    check();
  }, [check]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route path="/document-matching" element={<DocumentMatcher/>} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<AdminPanel />} />
          <Route path="/request-credits" element={<RequestCredit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
