
import PropTypes from "prop-types";
import { PieChart, Pie, Cell } from "recharts";

const GaugeChart = ({ value, maxValue, color, label }) => {
  // Data structure for the gauge chart
  const data = [
    { name: "Current", value: value },
    { name: "Remaining", value: Math.max(maxValue - value, 0) },
  ];

  const COLORS = [color, "#E0E0E0"]; // Primary color and background color

  // Calculate percentage for the center display
  const percentage = ((value / maxValue) * 100).toFixed(1);

  return (
    <div className="flex flex-col items-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180} // Start half-circle
          endAngle={0}     // End half-circle
          innerRadius={60} // Inner circle radius
          outerRadius={80} // Outer circle radius
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="text-center -mt-12">
        <p className="text-xl font-bold">{label}</p>
        <p className="text-2xl font-semibold">{percentage}%</p>
      </div>
    </div>
  );
};

// Prop type validation
GaugeChart.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default GaugeChart;
