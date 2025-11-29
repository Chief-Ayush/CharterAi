import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GraphIncomeExpense.css";

export default function GraphIncomeExpense({ data }) {
  return (
    <div className="dashboard-card">
      <h3 className="card-title">Income vs Expense Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--feature-border)" />
          <XAxis dataKey="month" stroke="var(--text-color)" />
          <YAxis stroke="var(--text-color)" />
          <Tooltip 
            contentStyle={{
              background: 'var(--feature-bg)',
              border: '2px solid var(--feature-border)',
              borderRadius: '12px',
              color: 'var(--text-color)'
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
