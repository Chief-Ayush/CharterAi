import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/Profile/ProfileHeader";
import PersonalInfoCard from "../components/Profile/PersonalInfoCard";
import BusinessInfoCard from "../components/Profile/BusinessInfoCard";
import GstInfoCard from "../components/Profile/GstInfoCard";
import DocumentListCard from "../components/Profile/DocumentListCard";
import OcrOverviewCard from "../components/Profile/OcrOverviewCard";
import PreferencesCard from "../components/Profile/PreferencesCard";
import SecurityCard from "../components/Profile/SecurityCard";
import "../styles/Profile.css";

export default function Profile() {
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

  // Static placeholder data
  const user = {
    accountType: "Business",
    businessName: "Brightwave Retail Pvt Ltd",
    country: "India",
    timezone: "Asia/Kolkata",
    email: "demo@example.com",
    phone: "+91 9876543210",
    segments: ["Groceries", "Daily Essentials"],
    currency: "INR",
    gstin: "24ABCDE1234F1Z5",
    gstFilingPeriod: "monthly",
    gstScheme: "regular",
    numberOfEmployees: 12,
    businessType: "Retail",
    businessOutline: "Multi-location retail store chain specializing in groceries and daily essentials",
    dateJoined: "January 15, 2024",
    businessDocs: [
      { filename: "gst_certificate.pdf", uploadedAt: "2024-01-10" },
      { filename: "business_registration.pdf", uploadedAt: "2024-01-12" },
      { filename: "trade_license.pdf", uploadedAt: "2024-01-15" }
    ],
    ocrStats: {
      totalDocuments: 245,
      totalInvoices: 182,
      totalReceipts: 63,
      pendingReview: 12,
      approved: 233
    }
  };

  return (
    <div className={`profile-container theme-${theme}`}>
      {/* Floating Background Shapes */}
      <div className="floating-shapes-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      <Navbar theme={theme} onThemeToggle={nextTheme} />

      <div className="profile-content">
        <div className="profile-header-section">
          <h1>{t('profile.title')}</h1>
          <p className="profile-subtitle">{t('profile.subtitle')}</p>
        </div>

        <ProfileHeader user={user} />

        <div className="profile-sections">
          <PersonalInfoCard user={user} />
          <BusinessInfoCard user={user} />
          <GstInfoCard user={user} />
          <OcrOverviewCard stats={user.ocrStats} />
          <DocumentListCard documents={user.businessDocs} />
          <PreferencesCard currency={user.currency} />
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
