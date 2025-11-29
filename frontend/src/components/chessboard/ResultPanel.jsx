import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

export default function ResultPanel({ timeline, simulationResult }) {
  const formatCurrency = (amount) => {
    return `₹${Math.abs(amount).toLocaleString("en-IN")}`;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "#ef4444";
      case "major":
        return "#f59e0b";
      case "warning":
        return "#eab308";
      default:
        return "#6b7280";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return "X";
      case "major":
        return "!";
      case "warning":
        return "i";
      default:
        return "•";
    }
  };

  // Prepare chart data
  const chartData = timeline.map((day) => ({
    day: day.day,
    balance: day.cashBalance,
    income: day.income,
    expenses: day.expenses,
  }));

  return (
    <>
      {!simulationResult ? (
        <div className="empty-results">
          <div className="empty-icon">?</div>
          <h3 className="empty-title">No Simulation Yet</h3>
          <p className="empty-description">
            Select a template and configure your move to see predictions and risk analysis
          </p>
        </div>
      ) : (
        <>
          {/* Confidence Band */}
          <div className="confidence-band">
            <div className="confidence-card confidence-worst">
              <div className="confidence-label">Worst Case</div>
              <div className="confidence-value">
                {formatCurrency(simulationResult.confidenceBand.worst)}
              </div>
            </div>
            <div className="confidence-card confidence-likely">
              <div className="confidence-label">Most Likely</div>
              <div className="confidence-value">
                {formatCurrency(simulationResult.confidenceBand.likely)}
              </div>
            </div>
            <div className="confidence-card confidence-best">
              <div className="confidence-label">Best Case</div>
              <div className="confidence-value">
                {formatCurrency(simulationResult.confidenceBand.best)}
              </div>
            </div>
          </div>

          {/* Cashflow Chart */}
          <div className="chart-section">
            <h3 className="chart-title">Cashflow Curve</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--feature-border)" />
                <XAxis
                  dataKey="day"
                  stroke="var(--secondary-text)"
                  fontSize={12}
                  label={{ value: "Days", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  stroke="var(--secondary-text)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--feature-bg)",
                    border: "1px solid var(--feature-border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBalance)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Conflicts and Warnings */}
          <div className="conflicts-section">
            {simulationResult.conflicts.length === 0 ? (
              <div className="no-conflicts">
                <div className="no-conflicts-icon">✓</div>
                <p>No critical issues detected</p>
              </div>
            ) : (
              <div className="conflicts-list">
                {simulationResult.conflicts.map((conflict, idx) => (
                  <div
                    key={idx}
                    className={`conflict-item severity-${conflict.severity}`}
                  >
                    <div className="conflict-header">
                      <span className="conflict-type">
                        {conflict.type.replace(/_/g, " ")}
                      </span>
                      <span className="conflict-severity">
                        {conflict.severity}
                      </span>
                    </div>
                    <p className="conflict-message">{conflict.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="explanation-section">
            <h3 className="explanation-title">AI Analysis</h3>
            <p className="explanation-text">{simulationResult.explanation}</p>
          </div>
        </>
      )}
    </>
  );
}
