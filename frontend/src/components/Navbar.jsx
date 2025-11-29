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
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Charter.ai Logo" className="logo-image" />
        <span className="logo-text">charter.ai</span>
      </div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <Link to="/dashboard">Dashboard</Link>
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
