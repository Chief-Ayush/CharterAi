import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState("Quarter");

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilterType(newFilter);
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  return (
    <div className="filters-card">
      <h3 className="filters-title">Filter Options</h3>

      <div className="filters-grid">

        {/* Filter By */}
        <div className="filter-field">
          <label>Filter By</label>
          <select value={filterType} onChange={handleFilterChange}>
            <option>Month</option>
            <option>Quarter</option>
            <option>Year</option>
          </select>
        </div>

        {/* Conditional Inputs */}
        {filterType === "Month" && (
          <div className="filter-field">
            <label>Select Month</label>
            <select>
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
              <option>June</option>
              <option>July</option>
              <option>August</option>
              <option>September</option>
              <option>October</option>
              <option>November</option>
              <option>December</option>
            </select>
          </div>
        )}

        {filterType === "Quarter" && (
          <div className="filter-field">
            <label>Select Quarter</label>
            <select>
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>
          </div>
        )}

        {filterType === "Year" && (
          <div className="filter-field">
            <label>Select Year</label>
            <select>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
        )}

        {/* Search */}
        <div className="filter-field full-width">
          <label>Search Product / Vendor</label>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      {/* Apply Filter Button */}
      <div className="apply-center">
        <button className="apply-btn">Apply Filter</button>
      </div>

      {/* Export Buttons */}
      <div className="export-row">
        <button className="export-btn">Export PDF</button>
        <button className="export-btn">Export CSV</button>
      </div>
    </div>
  );
};

export default Filters;
