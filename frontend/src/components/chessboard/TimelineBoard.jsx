import React, { useState } from "react";

export default function TimelineBoard({ timeline, onDropOnDay, hasDynamicMove }) {
  const [dragOverDay, setDragOverDay] = useState(null);

  const handleDragOver = (e, day) => {
    e.preventDefault();
    if (hasDynamicMove) {
      setDragOverDay(day);
    }
  };

  const handleDragLeave = () => {
    setDragOverDay(null);
  };

  const handleDrop = (e, day) => {
    e.preventDefault();
    setDragOverDay(null);
    if (hasDynamicMove) {
      onDropOnDay(day);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Math.abs(amount).toLocaleString("en-IN")}`;
  };

  const getCashBalanceClass = (balance) => {
    if (balance < 0) return "cash-negative";
    if (balance < 10000) return "cash-warning";
    return "cash-positive";
  };

  return (
    <div className="timeline-board">
      {timeline.map((day) => (
        <div
          key={day.day}
          className={`timeline-day ${dragOverDay === day.day ? "drag-over" : ""}`}
          onDragOver={(e) => handleDragOver(e, day.day)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, day.day)}
        >
          <div className="day-header">
            <span className="day-number">D{day.day}</span>
            <span className="day-date">
              {new Date(day.date).toLocaleDateString("en-IN", { 
                month: "short", 
                day: "numeric" 
              })}
            </span>
          </div>

          <div className="day-transactions">
            {day.items && day.items.length > 0 ? (
              day.items.map((item, idx) => (
                <div key={idx} className="transaction-item">
                  <span className={item.type === "Invoice" ? "income-indicator" : "expense-indicator"}>
                    {item.type === "Invoice" ? "+" : "-"}
                  </span>
                  <span className="transaction-amount">{formatCurrency(item.amount)}</span>
                </div>
              ))
            ) : (
              <div className="no-transactions">No activity</div>
            )}
          </div>

          <div className="day-balance">
            <span className="balance-label">Balance</span>
            <span className={`balance-amount ${getCashBalanceClass(day.cashBalance)}`}>
              {formatCurrency(day.cashBalance)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
