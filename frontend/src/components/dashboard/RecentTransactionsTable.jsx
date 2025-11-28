import React from "react";
import "./RecentTransactionsTable.css";

export default function RecentTransactionsTable({ transactions }) {
  return (
    <div className="dashboard-card table-card">
      <h3 className="card-title">Recent Transactions</h3>
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.date}</td>
                <td>{txn.description}</td>
                <td><span className="category-badge">{txn.category}</span></td>
                <td className={txn.type === 'income' ? 'amount-positive' : 'amount-negative'}>
                  {txn.type === 'income' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                </td>
                <td><span className={`status-badge status-${txn.status.toLowerCase()}`}>{txn.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
