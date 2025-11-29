import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import "../styles/Navbar.css";

export default function Navbar({ theme, onThemeToggle }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const themeLabels = {
    morning: "Morning",
    evening: "Evening",
    night: "Night"
  };

  useEffect(() => {
    // Check if user is logged in by checking for token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>Charter.ai</div>

      <nav className="nav-links">
        <Link to="/">{t('navbar.home')}</Link>
        <Link to="/dashboard">{t('navbar.dashboard')}</Link>
        <Link to="/tax-summary">{t('navbar.taxSummary')}</Link>
      </nav>

      <div className="header-actions">
        <LanguageSelector />
        {isLoggedIn ? (
          <div className="user-dropdown">
            <button 
              className="btn-user" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="user-icon">●</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link 
                  to="/profile" 
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <span className="dropdown-icon">◆</span>
                  {t('navbar.profile')}
                </Link>
                <button 
                  className="dropdown-item" 
                  onClick={onThemeToggle}
                >
                  <span className="dropdown-icon">◐</span>
                  {t('navbar.theme')}: {themeLabels[theme]}
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item logout" 
                  onClick={handleLogout}
                >
                  <span className="dropdown-icon">×</span>
                  {t('navbar.logout')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn-primary">{t('common.login')}</Link>
        )}
      </div>
    </header>
  );
}
