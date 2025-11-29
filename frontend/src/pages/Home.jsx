import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

export default function Home() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "morning";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeOrder = ["morning", "evening", "night"];
  const nextTheme = () => {
    const idx = themeOrder.indexOf(theme);
    setTheme(themeOrder[(idx + 1) % themeOrder.length]);
  };

  return (
    <div className={`home-container theme-${theme}`}>
      {/* Floating Background Shapes */}
      <div className="floating-shapes-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      <Navbar theme={theme} onThemeToggle={nextTheme} showAuthButtons={true} />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✦</span>
            <span className="badge-text">AI-Powered Financial Platform</span>
          </div>
          <h1 className="hero-title">{t('home.title')}</h1>
          <p className="hero-description">
            {t('home.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn-hero">
              <span className="btn-icon">📊</span>
              <span>{t('home.dashboard')}</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/chessboard" className="btn-hero">
              <span className="btn-icon">♟</span>
              <span>{t('home.cashflowSimulator')}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card card-floating">
            <div className="card-header">
              <div className="card-icon">📈</div>
              <div className="card-title">Real-Time Analytics</div>
            </div>
            <div className="card-chart">
              <div className="chart-bar" style={{height: '40%'}}></div>
              <div className="chart-bar" style={{height: '65%'}}></div>
              <div className="chart-bar" style={{height: '80%'}}></div>
              <div className="chart-bar" style={{height: '55%'}}></div>
              <div className="chart-bar" style={{height: '90%'}}></div>
            </div>
          </div>
          <div className="visual-card card-floating-delayed">
            <div className="card-header">
              <div className="card-icon">🎯</div>
              <div className="card-title">Smart Predictions</div>
            </div>
            <div className="prediction-items">
              <div className="prediction-item">
                <span className="pred-label">Next Month Revenue</span>
                <span className="pred-value positive">+12.5%</span>
              </div>
              <div className="prediction-item">
                <span className="pred-label">Cash Flow Status</span>
                <span className="pred-value success">Healthy</span>
              </div>
            </div>
          </div>
          <div className="visual-glow"></div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features" id="services">
        <div className="feature-card">
          <h3>{t('home.features.invoiceIngestion.title')}</h3>
          <p>
            {t('home.features.invoiceIngestion.description')}
          </p>
        </div>
        <div className="feature-card">
          <h3>{t('home.features.cashflowSimulator.title')}</h3>
          <p>
            {t('home.features.cashflowSimulator.description')}
          </p>
        </div>
        <div className="feature-card">
          <h3>{t('home.features.taxSummary.title')}</h3>
          <p>
            {t('home.features.taxSummary.description')}
          </p>
        </div>
        <div className="feature-card">
          <h3>{t('home.features.multilingualChat.title')}</h3>
          <p>
            {t('home.features.multilingualChat.description')}
          </p>
        </div>
        <div className="feature-card">
          <h3>{t('home.features.demoVideo.title')}</h3>
          <p>
            {t('home.features.demoVideo.description')}
          </p>
        </div>
        <div className="feature-card">
          <h3>{t('home.features.security.title')}</h3>
          <p>
            {t('home.features.security.description')}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-text">
          <h2>{t('home.about.title')}</h2>

          <p>
            {t('home.about.description1')}
          </p>

          <p>
            {t('home.about.description2')}
          </p>
        </div>

        <div className="about-images">
          <div className="about-img"></div>
          <div className="about-img"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Charter.ai</h4>
            <p>{t('home.footer.tagline')}</p>
          </div>
          <div className="footer-section">
            <h4>{t('home.footer.contact')}</h4>
            <p>support@charter.ai</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Charter.ai — {t('home.footer.copyright')}
        </div>
      </footer>

      {/* Floating AI Chatbot Button */}
      <Link to="/chatbot" className="floating-chat-btn" title={t('home.aiChatbot')}>
        <span className="chat-icon">💬</span>
      </Link>
    </div>
  );
}
