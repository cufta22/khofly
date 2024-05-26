interface Props {
  data: number[];
  labels: string[];
  width?: number;
  height?: number;
}

const HourlyChart: React.FC<Props> = ({
  data,
  labels,
  width = 400,
  height = 300,
}) => {
  // Calculate chart dimensions and margins
  const margin = 50;
  const chartWidth = width - margin * 2;
  const chartHeight = height - margin * 2;

  // Find minimum and maximum values for data normalization
  const dataMax = Math.max(...data);
  const dataMin = Math.min(...data);

  // Calculate scaling factor for y-axis
  const yScale = chartHeight / (dataMax - dataMin);

  // Define path for the line
  const linePath = data.reduce((acc, point, index) => {
    const x = margin + index * (chartWidth / (labels.length - 1));
    const y = chartHeight - (point - dataMin) * yScale;
    return `${acc} L${x},${y}`;
  }, "M"); // Start path with 'M' for move
  console.log(linePath);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* X-axis line */}
      <line
        x1={margin}
        y1={chartHeight + margin}
        x2={chartWidth + margin}
        y2={chartHeight + margin}
        stroke="black"
      />
      {/* Y-axis line */}
      <line
        x1={margin}
        y1={margin}
        x2={margin}
        y2={chartHeight + margin}
        stroke="black"
      />
      {/* X-axis labels */}
      {labels.map((label, index) => (
        <text
          key={index}
          x={margin + index * (chartWidth / (labels.length - 1))}
          y={chartHeight + margin + 15}
        >
          {label}
        </text>
      ))}
      {/* Line path */}
      {/* <path d={linePath} stroke="blue" fill="blue" /> */}

      <polyline
        fill="none"
        stroke="#0074d9"
        stroke-width="3"
        points="
       0,
       120 20,
       60 40,
       80 60,
       20 30, 20"
      />
    </svg>
  );
};

export default HourlyChart;
