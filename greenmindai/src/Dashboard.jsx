import CropRecommendation from "./components/CropRecommendation";
import PriceAnalyzer from "./components/PriceAnalyzer";
import ProfitCalculator from "./components/ProfitCalculator";
import SubsidySuggestions from "./components/SubsidySuggestions";
import MapView from "./components/MapView";
import CameraCapture from "./components/CameraCapture";
import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-header">🌾 Smart Farming Dashboard</h1>
      <div className="dashboard-grid">
        <CameraCapture />
        <CropRecommendation />
        <PriceAnalysis />
        <ProfitCalculator />
        <SubsidySuggestions />
      </div>
    </div>
  );
};

export default Dashboard;
