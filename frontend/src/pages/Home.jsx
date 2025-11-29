import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

export default function Home() {
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
          <h1>Your AI Financial Co-Pilot</h1>
          <p>
            Automate your finances, simulate cashflow, and get instant tax
            summaries—all with multilingual voice & chat.
          </p>
          <div className="hero-actions">
            <Link to="/chatbot" className="btn-hero">
              Try Chatbot Now
            </Link>
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
          <h3>Automated Invoice Ingestion</h3>
          <p>
            Upload or email invoices—AI extracts, parses, and organizes them for
            you.
          </p>
        </div>
        <div className="feature-card">
          <h3>Cashflow Simulator</h3>
          <p>
            Visualize and simulate your business cashflow with scenario planning
            tools.
          </p>
        </div>
        <div className="feature-card">
          <h3>Tax Summary Reports</h3>
          <p>
            Instantly generate tax-ready summaries and downloadable reports.
          </p>
        </div>
        <div className="feature-card">
          <h3>Multilingual Voice & Chat</h3>
          <p>
            Interact with your finances using natural language—voice or chat, in
            your language.
          </p>
        </div>
        <div className="feature-card">
          <h3>Demo Video</h3>
          <p>
            See it in action!{" "}
            <span style={{ color: "var(--primary)" }}>
              Watch our quick demo above.
            </span>
          </p>
        </div>
        <div className="feature-card">
          <h3>Secure & Compliant</h3>
          <p>
            Bank-level security with full compliance to protect your financial
            data.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-text">
          <h2>Trusted guidance for financial growth</h2>

          <p>
            Charter.ai empowers MSMEs by automating bookkeeping, forecasting
            cash flow, and generating tax-ready summaries.
          </p>

          <p>
            Access everything with a multilingual, natural language interface.
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
            <p>Your AI Financial Co-Pilot for MSME Empowerment</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>support@charter.ai</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 Charter.ai — Built for MSME Empowerment
        </div>
      </footer>
    </div>
  );
}
