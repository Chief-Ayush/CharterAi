import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ theme, onThemeToggle, showAuthButtons = true }) {
  const navigate = useNavigate();
  
  const themeLabels = {
    morning: "Morning",
    evening: "Evening",
    night: "Night"
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>Charter.ai</div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/chatbot">Chatbot</Link>
        <Link to="/chessboard">Chessboard</Link>
        <a href="#contact">Contact</a>
      </nav>

      <div className="header-actions">
        <button className="btn-theme" onClick={onThemeToggle}>
          {themeLabels[theme]}
        </button>
        {showAuthButtons && (
          <Link to="/login" className="btn-primary">Login</Link>
        )}
      </div>
    </header>
  );
}
