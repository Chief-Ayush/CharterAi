import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import FinancialChessboard from "./pages/FinancialChessboard";
import Chatbot from "./pages/chatbot";
import TaxSummary from "./pages/TaxSummary";
import Profile from "./pages/Profile";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chessboard" element={<FinancialChessboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/tax-summary" element={<TaxSummary />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
