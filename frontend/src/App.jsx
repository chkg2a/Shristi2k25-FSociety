import "./App.css";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage.jsx";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import DocumentUpload from "./components/DocumentUpload.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import { useEffect } from "react";
import useAuthStore from "./store/authStore";
import DocumentMatcher from "./pages/DocumentMatcher.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import Payment from "./components/Payment.jsx";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

const RedirectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/document-matching" replace />;
  }

  return children;
};

function App() {
  const { check } = useAuthStore();

  useEffect(() => {
    check();
  }, [check]);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error404Page />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/document-upload"
            element={
              <ProtectedRoute role={["moderator", "admin", "user"]}>
                <DocumentUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/document-matching"
            element={
              <ProtectedRoute role={["moderator", "admin", "user"]}>
                <DocumentMatcher />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/sign-up" 
            element={
              <RedirectedRoute>
                <SignUp />
              </RedirectedRoute>
            } 
          />
          <Route 
            path="/sign-in" 
            element={
              <RedirectedRoute>
                <SignIn />
              </RedirectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute role={["admin"]}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wallet" 
            element={
              <ProtectedRoute role={["moderator", "admin", "user"]}>
                <Payment />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

