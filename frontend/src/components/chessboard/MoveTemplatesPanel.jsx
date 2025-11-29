import React from "react";

const TEMPLATES = [
  {
    id: "delay_payment",
    label: "Delay Payment",
    description: "Postpone an income or expense to a later date",
    color: "#f59e0b",
    fields: ["oldDay", "newDay", "itemId", "amount"],
  },
  {
    id: "add_expense",
    label: "Add Unexpected Expense",
    description: "Add a new unplanned expense on a specific day",
    color: "#ef4444",
    fields: ["day", "amount", "category"],
  },
  {
    id: "receive_early",
    label: "Receive Early Payment",
    description: "Move customer payment to an earlier date",
    color: "#10b981",
    fields: ["oldDay", "newDay", "itemId", "amount"],
  },
  {
    id: "short_loan",
    label: "Short-term Loan",
    description: "Take immediate loan with repayment later",
    color: "#8b5cf6",
    fields: ["loanAmount", "repaymentDay"],
  },
  {
    id: "postpone_gst",
    label: "Postpone GST Payment",
    description: "Delay GST payment (may incur penalties)",
    color: "#ec4899",
    fields: ["oldDay", "newDay", "gstAmount"],
  },
];

export default function MoveTemplatesPanel({ onTemplateClick, dynamicMove }) {
  return (
    <>
      <div className="templates-list">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => onTemplateClick(template)}
            style={{ '--template-color': template.color }}
          >
            <h3 className="template-label">{template.label}</h3>
            <p className="template-description">{template.description}</p>
          </div>
        ))}
      </div>

      {dynamicMove && (
        <div className="active-move-indicator">
          <div className="indicator-header">
            <span className="indicator-icon">✓</span>
            <span className="indicator-text">Move Simulated</span>
          </div>
          <p className="indicator-subtitle">Check results panel on the right</p>
          <div className="move-preview">
            <strong>Type:</strong> {dynamicMove.type}
            <br />
            {dynamicMove.amount && (
              <>
                <strong>Amount:</strong> ₹{dynamicMove.amount.toLocaleString()}
                <br />
              </>
            )}
            {dynamicMove.loanAmount && (
              <>
                <strong>Loan:</strong> ₹{dynamicMove.loanAmount.toLocaleString()}
                <br />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
