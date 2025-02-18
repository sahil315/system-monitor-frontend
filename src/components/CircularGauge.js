import React from "react";

const CircularGauge = ({ percentage, size, radius, numSegments ,barWidth, barGap  }) => {
  // const numSegments = 70; // High precision (more segments)
  const filledSegments = Math.round((percentage / 100) * numSegments);
  // const size = 180;
  // const radius = 70;
  // const barWidth = 5.5;
  // const barGap = 5;
  const center = size / 2;
  const segmentAngle = 360 / numSegments;

  // Corrected color logic
  const getBarColor = (index) => {
    if (index < filledSegments) {
      if (percentage <= 40) return "#39C0ED"; // Cool - Light Blue
      if (percentage <= 70) return "#00FFFF"; // Warm - Cyan
      return "#FF007F"; // Hot - Magenta Pink
    }
    return "#222C3E"; // Inactive bars (Dark muted color)
  };

  return (
    <div style={styles.container}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer Ring */}
        <circle cx={center} cy={center} r={radius + 10} fill="none" stroke="#0ABDE3" strokeWidth="3" opacity="0.6" />

        {/* Inner Ring */}
        <circle cx={center} cy={center} r={radius - 10} fill="none" stroke="#0ABDE3" strokeWidth="3" opacity="0.6" />

        {/* Temperature Bars */}
        {Array.from({ length: numSegments }).map((_, i) => {
          const angle = i * segmentAngle;
          const radian = (angle * Math.PI) / 180;
          const x1 = center + (radius - barGap) * Math.cos(radian);
          const y1 = center + (radius - barGap) * Math.sin(radian);
          const x2 = center + (radius + barGap) * Math.cos(radian);
          const y2 = center + (radius + barGap) * Math.sin(radian);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={getBarColor(i)}
              strokeWidth={barWidth}
              strokeLinecap="round"
            />
          );
        })}

        {/* Temperature Display */}
        <text x={center} y={center} textAnchor="middle" dy="10" fontSize="28" fill="white" fontWeight="bold">
          {percentage}°C
        </text>
      </svg>
    </div>
  );
};

// Styles with Transparent Background
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent", // Fix weird background issue
    padding: "0px 20px",
    borderRadius: "50%",
    height: "max-content",
  },
};

export default CircularGauge;
