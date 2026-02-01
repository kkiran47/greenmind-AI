import React from "react";
import "../card.css";
import "../subsidy.css";

const SubsidySuggestions = () => {
  const schemes = [
    {
      name: "PM-KISAN",
      desc: "₹6000 per year income support"
    },
    {
      name: "Soil Health Card",
      desc: "Free soil testing & guidance"
    },
    {
      name: "Crop Insurance (PMFBY)",
      desc: "Low premium crop insurance"
    }
  ];

  return (
    <div className="card">
      <h3 className="card-title">Government Subsidies</h3>

      {schemes.map((s, i) => (
        <div className="subsidy-item" key={i}>
          <h4>{s.name}</h4>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default SubsidySuggestions;
