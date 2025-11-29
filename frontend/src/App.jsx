import React, { useState, useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FinancialChessboard from "./pages/FinancialChessboard";
import Chatbot from "./pages/chatbot";
import TaxSummary from "./pages/TaxSummary";
import Profile from "./pages/Profile";
import DocumentUpload from "./pages/DocumentUpload";
import "./App.css";

function RouteChangeLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  const theme = localStorage.getItem("theme") || "morning";

  return (
    <div className={`route-loader theme-${theme}`}>
      <div className="route-loader-bar"></div>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <RouteChangeLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chessboard"
          element={
            <ProtectedRoute>
              <FinancialChessboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tax-summary"
          element={
            <ProtectedRoute>
              <TaxSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <DocumentUpload />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function LoadingFallback() {
  const theme = localStorage.getItem("theme") || "morning";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background:
          theme === "morning"
            ? "linear-gradient(135deg, #0ea5e9, #3b82f6)"
            : theme === "evening"
            ? "linear-gradient(135deg, #f97316, #fb923c)"
            : "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        fontSize: "20px",
        fontWeight: "600",
      }}
    >
      Loading Charter.ai...
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Router>
          <UserProvider>
            <div className="app-container">
              <AppContent />
            </div>
          </UserProvider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
