import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GraphGST.css";

export default function GraphGST({ data }) {
  return (
    <div className="dashboard-card">
      <h3 className="card-title">GST Input vs Output</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          <Bar dataKey="input" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="output" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
