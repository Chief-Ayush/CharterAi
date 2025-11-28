import React from "react";
import "./AlertsPanel.css";

export default function AlertsPanel({ alerts }) {
  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return '!';
      case 'error': return 'X';
      case 'info': return 'i';
      case 'success': return '✓';
      default: return '•';
    }
  };

  return (
    <div className="dashboard-card alerts-panel">
      <h3 className="card-title">Alerts & Compliance Reminders</h3>
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className={`alert-item alert-${alert.type}`}>
            <div className="alert-icon">{getAlertIcon(alert.type)}</div>
            <div className="alert-content">
              <div className="alert-title">{alert.title}</div>
              <div className="alert-message">{alert.message}</div>
              <div className="alert-date">{alert.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
