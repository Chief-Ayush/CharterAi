import React from "react";

const TaxSummaryCards = ({ summary }) => {
  const summaryData = summary 
    ? Object.entries(summary).map(([title, value]) => ({ title, value }))
    : [
        { title: "Total Sales", value: "₹ 12,50,000" },
        { title: "Total ITC", value: "₹ 4,20,000" },
        { title: "GST Collected", value: "₹ 2,80,000" },
        { title: "Net Tax Payable", value: "₹ 1,20,000" },
      ];

  const firstSixCards = summaryData.slice(0, 6);
  const lastRowCards = summaryData.slice(6);

  return (
    <>
      <div className="summary-cards-grid-top">
        {firstSixCards.map((item, index) => (
          <div key={index} className="glass-card-summary">
            <div className="card-glow"></div>
            <div className="card-content">
              <p className="card-title">{item.title}</p>
              <h3 className="card-value">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
      {lastRowCards.length > 0 && (
        <div className="summary-cards-grid-bottom">
          {lastRowCards.map((item, index) => (
            <div key={index + 6} className="glass-card-summary">
              <div className="card-glow"></div>
              <div className="card-content">
                <p className="card-title">{item.title}</p>
                <h3 className="card-value">{item.value}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TaxSummaryCards;

