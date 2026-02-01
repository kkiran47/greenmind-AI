import React, { useState } from "react";
import "../card.css";
import "../forms.css";

const ProfitCalculator = () => {
  const [cost, setCost] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const profit = revenue - cost;

  return (
    <div className="card">
      <h3 className="card-title">Profit Calculator</h3>

      <div className="form-group">
        <label>Total Cost (₹)</label>
        <input type="number" onChange={(e) => setCost(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Expected Revenue (₹)</label>
        <input type="number" onChange={(e) => setRevenue(e.target.value)} />
      </div>

      <h4 className={profit >= 0 ? "profit-positive" : "profit-negative"}>
        Net Profit: ₹{profit}
      </h4>
    </div>
  );
};

export default ProfitCalculator;
