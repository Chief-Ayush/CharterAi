import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { authAPI } from "../utils/api";
import "../styles/Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginUser } = useUser();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "morning"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  // ------------------ HANDLE LOGIN ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await authAPI.login(email, password);
      loginUser(response.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => alert("Google Login Coming Soon");

  // ------------------ LOADING SCREEN ------------------
  if (loading) return <LoaderScreen theme={theme} />;

  return (
    <div className={`auth-container theme-${theme}`}>
      <BackgroundShapes />

      <div className="auth-header-bar">
        <Link to="/" className="back-btn">
          ← Home
        </Link>
        <button className="theme-toggle-btn" onClick={nextTheme}>
          {themeLabels[theme]}
        </button>
      </div>

      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <BrandBlock />

          <div className="form-content">
            <h2>Welcome Back</h2>
            <p>Log in to continue your AI-driven financial journey.</p>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              <Input
                value={email}
                setter={setEmail}
                placeholder="Email"
                type="email"
              />
              <Input
                value={password}
                setter={setPassword}
                placeholder="Password"
                type="password"
              />

              <div className="form-footer-links">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <Divider />

              <GoogleButton
                text="Login with Google"
                action={handleGoogleLogin}
              />

              <button
                type="submit"
                className="btn-submit"
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <AuthSwitch
              text="Don't have an account?"
              link="/signup"
              linkText="Sign Up"
            />
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----- Reusable Components ----- */

function LoaderScreen({ theme }) {
  return (
    <div className={`auth-loader theme-${theme}`}>
      <div className="loader-content">
        {theme === "morning" && <div className="loader-sun"></div>}
        {theme === "evening" && <div className="loader-evening"></div>}
        {theme === "night" && <div className="loader-night"></div>}
        <p>Loading your experience...</p>
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
      required
    />
  );
}

const Divider = () => (
  <div className="form-divider">
    <span>or</span>
  </div>
);

const BrandBlock = () => (
  <div className="form-brand">
    <h1>Charter.ai</h1>
    <p>Your AI Financial Co-Pilot</p>
  </div>
);

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
