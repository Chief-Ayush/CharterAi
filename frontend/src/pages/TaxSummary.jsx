import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import "../styles/TaxSummary.css";

export default function TaxSummary() {
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
    <div className={`tax-summary-container theme-${theme}`}>
      <Navbar theme={theme} onThemeToggle={nextTheme} />
      
      <div className="tax-summary-content">
        <div className="tax-summary-header">
          <h1>{t('taxSummary.title')}</h1>
          <p className="header-subtitle">{t('taxSummary.subtitle')}</p>
        </div>

        <div className="tax-summary-body">
          <div className="info-card">
            <h2>{t('taxSummary.comingSoon')}</h2>
            <p>{t('taxSummary.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
