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
        <div className="hero-text">
          <h1>{t('home.title')}</h1>
          <p>
            {t('home.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/chatbot" className="btn-hero">{t('home.aiChatbot')}</Link>
            <Link to="/chessboard" className="btn-hero btn-hero-secondary">{t('home.cashflowSimulator')}</Link>
            <Link to="/dashboard" className="btn-hero btn-hero-tertiary">{t('home.dashboard')}</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-box">
            {/* Optionally, embed a demo video here */}
            {/* <video src="/demo.mp4" controls style={{width: '100%', borderRadius: 24}} /> */}
          </div>
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
    </div>
  );
}
