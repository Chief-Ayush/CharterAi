import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../styles/Auth.css";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login: loginUser } = useUser();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "morning");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [country, setCountry] = useState("India");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  const [gstin, setGstin] = useState("");
  const [gstFilingPeriod, setGstFilingPeriod] = useState("not_applicable");
  const [gstScheme, setGstScheme] = useState("not_applicable");
  const [businessDocs, setBusinessDocs] = useState([]);

  // ------------------ THEME ------------------
  const themeOrder = ["morning", "evening", "night"];
  const themeLabels = {
    morning: "Morning",
    evening: "Evening",
    night: "Night",
  };

  const nextTheme = () => {
    const newTheme =
      themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // ------------------ PAGE LOADER ------------------
  useEffect(() => {
    setTimeout(() => setLoading(false), 900);
  }, []);

  // ------------------ HANDLE SIGNUP ------------------
  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    } else if (step === 2) {
      if (!businessName || !country || !timezone || !currency) {
        setError("Please fill all required fields");
        return;
      }
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setError("");
    setStep(step - 1);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("Maximum 5 files allowed");
      return;
    }
    setBusinessDocs(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      let response;

      if (businessDocs.length > 0) {
        // Use FormData for file upload
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("businessName", businessName);
        formData.append("businessType", businessType);
        formData.append("timezone", timezone);
        formData.append("country", country);
        formData.append("currency", currency);
        formData.append("gstin", gstin);
        formData.append("gstFilingPeriod", gstFilingPeriod);
        formData.append("gstScheme", gstScheme);

        businessDocs.forEach((file) => {
          formData.append("businessDocs", file);
        });

        response = await authAPI.signupWithFiles(formData);
      } else {
        // Use JSON for no files
        response = await authAPI.signup({
          email,
          password,
          phone,
          businessName,
          businessType,
          timezone,
          country,
          currency,
          gstin,
          gstFilingPeriod,
          gstScheme,
        });
      }

      loginUser(response.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = () => alert("Google Signup Coming Soon");

  // ------------------ LOADING SCREEN ------------------
  if (loading) return <LoaderScreen theme={theme} />;

  return (
    <div className={`auth-container theme-${theme}`}>
      <BackgroundShapes />

      <div className="auth-header-bar">
        <Link to="/" className="back-btn">← Home</Link>
        <button className="theme-toggle-btn" onClick={nextTheme}>{themeLabels[theme]}</button>
      </div>

      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <BrandBlock />

          <div className="form-content">
            <h2>{t('auth.signup.title')}</h2>
            <p>{t('auth.signup.subtitle')}</p>

            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              <Input value={name} setter={setName} placeholder={t('auth.signup.fullName')} type="text" />
              <Input value={email} setter={setEmail} placeholder={t('auth.signup.email')} type="email" />
              <Input value={password} setter={setPassword} placeholder={t('auth.signup.password')} type="password" />

              <Divider />

              <GoogleButton text="Sign up with Google" action={handleGoogleSignup} />

              <button type="submit" className="btn-submit">Sign Up</button>
            </form>

            <AuthSwitch text={t('auth.signup.haveAccount')} link="/login" linkText={t('auth.signup.loginLink')} />
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----- Reusable Components ----- */

function LoaderScreen({ theme }) {
  const { t } = useTranslation();
  return (
    <div className={`auth-loader theme-${theme}`}>
      <div className="loader-content">
        {theme === "morning" && <div className="loader-sun"></div>}
        {theme === "evening" && <div className="loader-evening"></div>}
        {theme === "night" && <div className="loader-night"></div>}
        <p>{t('auth.loadingExperience')}</p>
      </div>
    </div>
  );
}

function Input({ value, setter, type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setter(e.target.value)}
      className="form-input"
    />
  );
}

function Select({ value, setter, label, children }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="form-input"
      >
        {children}
      </select>
    </div>
  );
}

const Divider = () => (
  <div className="form-divider">
    <span>or</span>
  </div>
);

const BrandBlock = () => {
  const { t } = useTranslation();
  return (
    <div className="form-brand">
      <h1>Charter.ai</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
};

const GoogleButton = ({ text, action }) => (
  <button type="button" className="btn-google" onClick={action}>
    <img
      src="https://www.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
      width="18"
      alt="g"
    />{" "}
    {text}
  </button>
);

const AuthSwitch = ({ text, link, linkText }) => (
  <p className="form-switch">
    {text} <Link to={link}>{linkText}</Link>
  </p>
);

const SocialIcons = () => (
  <div className="social-links">
    <i className="fab fa-facebook"></i>
    <i className="fab fa-twitter"></i>
    <i className="fab fa-linkedin"></i>
    <i className="fab fa-instagram"></i>
  </div>
);

function BackgroundShapes() {
  return (
    <div className="floating-shapes-bg">
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      <div className="floating-shape shape-4"></div>
      <div className="floating-shape shape-5"></div>
    </div>
  );
}
