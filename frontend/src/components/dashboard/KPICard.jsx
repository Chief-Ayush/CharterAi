import React from "react";
import "./KPICard.css";

export default function KPICard({ title, value, subtitle, icon, trend }) {
  return (
    <div className="kpi-card">
      {icon && <div className="kpi-icon">{icon}</div>}
      <div className="kpi-content" style={!icon ? { flex: 1 } : {}}>
        <h3 className="kpi-title">{title}</h3>
        <div className="kpi-value">{value}</div>
        <div className="kpi-subtitle">
          {trend && <span className={`kpi-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>}
          {subtitle}
        </div>
      </div>
    </div>
  );
}
