export default function MapView() {
  return (
    <div className="card">
      <h2>🗺️ Soil & Climate Map</h2>
      <iframe
        title="map"
        src="https://www.openstreetmap.org/export/embed.html"
        width="100%"
        height="250"
      />
    </div>
  );
}
