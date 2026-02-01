import React from "react";
import "../card.css";
import "../charts.css";
const PriceAnalysis = () => {
  const prices = [
    { crop: "Rice", price: 2200 },
    { crop: "Wheat", price: 2100 },
    { crop: "Cotton", price: 6200 }
  ];
  return (
    <div className="card">
      <h3 className="card-title">Market Price Analysis</h3>
      {prices.map((item, index) => (
        <p key={index}>
          {item.crop}: ₹{item.price} / quintal
        </p>
      ))}
    </div>
  );
};
export default PriceAnalysis;
