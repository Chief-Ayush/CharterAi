
import React, { useState } from "react";

const cardLabels = [
  "Total Sales",
  "Total ITC",
  "GST Collected",
  "GST Payable",
  "Tax Paid",
  "Pending Tax",
  "Upcoming Due",
  "Alerts / Issues"
];

const cardColors = [
  '#667eea',
  '#764ba2',
  '#f093fb',
  '#f5576c',
  '#4facfe',
  '#43e97b',
  '#fa709a',
  '#ff6b6b'
];

const SummaryCards = ({ summary }) => {
  const [hovered, setHovered] = useState(null);

  // Map summary values to cardLabels order
  const values = cardLabels.map(label => summary[label] || "-");

  return (
    <div className="card-container" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: '20px 0'}}>
      {cardLabels.map((label, idx) => (
        <div
          className="summary-card"
          key={label}
          style={{
            cursor: 'pointer',
            borderRadius: '12px',
            background: hovered === idx ? cardColors[idx] : '#ffffff',
            color: hovered === idx ? '#fff' : '#333',
            padding: '24px 16px',
            height: '130px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered === idx ? `0 10px 30px rgba(0, 0, 0, 0.15)` : '0 2px 10px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e8e8e8',
            fontWeight: 'bold',
            fontSize: '1.1em',
            textAlign: 'center',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            lineHeight: '1.5'
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{
            opacity: hovered === idx ? 0 : 1,
            transition: 'opacity 0.3s ease 0.05s',
            fontSize: '0.9em',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            {label}
          </div>
          <div style={{
            opacity: hovered === idx ? 1 : 0,
            transition: 'opacity 0.3s ease 0.1s',
            fontSize: '1.8em',
            fontWeight: 'bold'
          }}>
            {values[idx]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
