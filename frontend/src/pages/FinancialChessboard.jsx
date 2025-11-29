import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import MoveTemplatesPanel from "../components/chessboard/MoveTemplatesPanel";
import MoveEditorModal from "../components/chessboard/MoveEditorModal";
import TimelineBoard from "../components/chessboard/TimelineBoard";
import ResultPanel from "../components/chessboard/ResultPanel";
import "../styles/Chessboard.css";

export default function FinancialChessboard() {
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

  // State
  const [baseTimeline, setBaseTimeline] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicMove, setDynamicMove] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded userId for demo (replace with actual auth)
  const userId = "692a490f6b5bb0db56389d09"; // Real user ID: test@charter.ai

  // Load base timeline on mount
  useEffect(() => {
    loadBaseTimeline();
  }, []);

  const loadBaseTimeline = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/chessboard/timeline`, {
        params: { userId },
      });
      setBaseTimeline(response.data.timeline);
      setCurrentTimeline(response.data.timeline);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load timeline:", err);
      setError("Failed to load timeline data. Make sure backend is running.");
      setLoading(false);
    }
  };

  // Handle template selection
  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  // Handle modal submit - immediately run simulation
  const handleModalSubmit = async (moveData) => {
    setDynamicMove(moveData);
    setIsModalOpen(false);

    // Run simulation immediately
    try {
      setLoading(true);

      const response = await axios.post(
        `http://localhost:4000/api/chessboard/simulate-move`,
        {
          userId,
          move: moveData,
        }
      );

      if (response.data.success) {
        setCurrentTimeline(response.data.updatedTimeline);
        setSimulationResult({
          confidenceBand: response.data.confidenceBand,
          conflicts: response.data.conflicts,
          explanation: response.data.explanation,
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Simulation failed:", err);
      setError("Simulation failed. Please try again.");
      setLoading(false);
    }
  };

  // Handle drop on timeline (kept for potential future drag-drop)
  const handleDropOnDay = async (day) => {
    if (!dynamicMove) return;

    try {
      setLoading(true);

      // Build complete move object
      const completeMove = {
        ...dynamicMove,
        day: day, // For moves that need a target day
      };

      const response = await axios.post(
        `http://localhost:4000/api/chessboard/simulate-move`,
        {
          userId,
          move: completeMove,
        }
      );

      if (response.data.success) {
        setCurrentTimeline(response.data.updatedTimeline);
        setSimulationResult({
          confidenceBand: response.data.confidenceBand,
          conflicts: response.data.conflicts,
          explanation: response.data.explanation,
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Simulation failed:", err);
      setError("Simulation failed. Please try again.");
      setLoading(false);
    }
  };

  // Reset simulation
  const handleReset = () => {
    setCurrentTimeline(baseTimeline);
    setDynamicMove(null);
    setSimulationResult(null);
  };

  if (loading && baseTimeline.length === 0) {
    return (
      <div className={`chessboard-container theme-${theme}`}>
        <div className="floating-shapes-bg">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
        </div>
        <Navbar theme={theme} onThemeToggle={nextTheme} showAuthButtons={false} />
        <div className="chessboard-content">
          <div className="loading-message">Loading Financial Chessboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`chessboard-container theme-${theme}`}>
        <div className="floating-shapes-bg">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
        </div>
        <Navbar theme={theme} onThemeToggle={nextTheme} showAuthButtons={false} />
        <div className="chessboard-content">
          <div className="error-message">{error}</div>
          <button className="btn-secondary" onClick={loadBaseTimeline}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`chessboard-container theme-${theme}`}>
      {/* Floating Background Shapes */}
      <div className="floating-shapes-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      <Navbar theme={theme} onThemeToggle={nextTheme} showAuthButtons={false} />

      <div className="chessboard-content">
        {/* Header */}
        <div className="chessboard-header">
          <div>
            <h1>Financial Chessboard</h1>
            <p>
              Drag and drop financial moves to simulate cashflow scenarios and predict
              outcomes
            </p>
          </div>
          <div className="chessboard-actions">
            <button className="btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button className="btn-secondary" onClick={loadBaseTimeline}>
              Refresh Data
            </button>
          </div>
        </div>

        {/* Main Grid: Stacked Single Column */}
        <div className="chessboard-grid">
          {/* 1. Move Templates - Top */}
          <div className="panel-section templates-section">
            <div className="panel-header">
              <h2 className="panel-title">Action Templates</h2>
              <p className="panel-subtitle">Select a template to simulate financial moves</p>
            </div>
            <div className="panel-body">
              <MoveTemplatesPanel
                onTemplateClick={handleTemplateClick}
                dynamicMove={dynamicMove}
              />
            </div>
          </div>

          {/* 2. Timeline Calendar - Middle */}
          <div className="panel-section timeline-section">
            <div className="panel-header">
              <h2 className="panel-title">30-Day Cashflow Calendar</h2>
              <p className="panel-subtitle">Click on any day to view details</p>
            </div>
            <TimelineBoard
              timeline={currentTimeline}
              onDropOnDay={handleDropOnDay}
              hasDynamicMove={!!dynamicMove}
            />
          </div>

          {/* 3. Simulation Analysis - Bottom */}
          <div className="panel-section results-section">
            <div className="panel-header">
              <h2 className="panel-title">Simulation Analysis</h2>
              <p className="panel-subtitle">Predicted outcomes and risk analysis</p>
            </div>
            <ResultPanel
              timeline={currentTimeline}
              simulationResult={simulationResult}
            />
          </div>
        </div>
      </div>

      {/* Move Editor Modal */}
      {isModalOpen && (
        <MoveEditorModal
          template={selectedTemplate}
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
