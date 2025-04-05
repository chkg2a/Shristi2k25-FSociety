import "./App.css";
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
  const { isLoading, check, isAuthenticated } = useAuthStore();

  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <>
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<AdminPanel />} />
          <Route path="/wallet" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;