import React from "react";

const Filters = () => {
  const [filterType, setFilterType] = React.useState('Month');
  const [customDate, setCustomDate] = React.useState('');

  return (
    <div className="filters" style={{textAlign: 'left', fontFamily: 'arial', fontSize: '1em', background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '12px', border: '1px solid #bae6fd', marginBottom: '10px', boxShadow: '0 4px 15px rgba(14, 165, 233, 0.1)'}}>
      <div style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px'}}>
        <span style={{color: '#0284c7', fontWeight: 'bold', minWidth: '60px'}}>Filter:</span>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{padding: '8px 12px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>
          <option value="Month">Month</option>
          <option value="Quarter">Quarter</option>
          <option value="Year">Year</option>
        </select>
        <button style={{padding: '8px 20px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>Filter</button>
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
        <span style={{color: '#0284c7', fontWeight: 'bold', minWidth: '60px'}}>Search:</span>
        <input type="text" placeholder="Product / Vendor" style={{padding: '8px 12px', background: '#f0f9ff', color: '#0c4a6e', border: '1px solid #bae6fd', borderRadius: '6px', fontWeight: '500', flex: '1', maxWidth: '250px'}} />
        <button style={{padding: '8px 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>Export PDF</button>
        <button style={{padding: '8px 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'}}>Export CSV</button>
      </div>
    </div>
  );
};

export default Filters;
