import { Line } from "react-chartjs-2";

export default function YieldChart({ data }) {
  return (
    <Line
      data={{
        labels: data.months,
        datasets: [
          {
            label: "Price Trend",
            data: data.prices
          }
        ]
      }}
    />
  );
}
