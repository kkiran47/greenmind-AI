import React, { useState } from "react";
import "../forms.css";
import "../card.css";

const CropRecommendation = () => {
  const [form, setForm] = useState({
    soil: "",
    season: "",
    rainfall: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const recommendCrop = () => {
    if (form.soil === "black" && form.season === "kharif") return "Cotton 🌾";
    if (form.soil === "red" && form.season === "rabi") return "Groundnut 🌱";
    return "Rice 🌾";
  };

  return (
    <div className="card">
      <h3 className="card-title">Crop Recommendation</h3>

      <div className="form-group">
        <label>Soil Type</label>
        <select name="soil" onChange={handleChange}>
          <option value="">Select</option>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="alluvial">Alluvial</option>
        </select>
      </div>

      <div className="form-group">
        <label>Season</label>
        <select name="season" onChange={handleChange}>
          <option value="">Select</option>
          <option value="kharif">Kharif</option>
          <option value="rabi">Rabi</option>
          <option value="zaid">Zaid</option>
        </select>
      </div>

      <button className="submit-btn">
        Recommended: {recommendCrop()}
      </button>
    </div>
  );
};

export default CropRecommendation;
