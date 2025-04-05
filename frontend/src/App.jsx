import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"
import AdminPanel from "./pages/AdminPanel.jsx"
import DocumentScanner from "./pages/DocumentScanner.jsx";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";

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
          <Route path="/document-matching" element={<DocumentScanner />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
