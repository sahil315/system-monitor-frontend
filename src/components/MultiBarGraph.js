import React from "react";

const MultiBarGraph = ({ bars, values = [], labels = [], maxValue, maxBarHeight, barWidth, outerBarWidth, gap, containerHeight }) => {
  // const maxBarHeight = 60; // Max height of bars
  // const barWidth = 15; // Width of each inner bar
  // const outerBarWidth = 18; // Outer border width
  // const gap = 5; // Space between bars
  // const containerHeight = 80;
  const containerWidth = bars * (outerBarWidth + gap);

  // Determine max value dynamically if not provided
  const computedMaxValue = maxValue || Math.max(...values, 1); // Avoid division by zero

  // Scale values based on the determined max value
  const getScaledHeight = (value) => (value / computedMaxValue) * maxBarHeight;

  const getBarColor = (value) => {
    if (value > computedMaxValue * 0.75) return "#ff9900"; // Orange for high values
    if (value > computedMaxValue * 0.5) return "#cccccc"; // Light gray for mid values
    if (value > computedMaxValue * 0.25) return "#888888"; // Darker gray for low values
    return "#ffffff"; // White for very low values
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "max-content" }}>
      <svg width={containerWidth} height={containerHeight + 20}>
        {Array.from({ length: bars }).map((_, i) => {
          const value = values[i] || 0;
          const barHeight = getScaledHeight(value);
          return (
            <g key={i}>
              {/* Outer Bar Border */}
              <rect
                x={i * (outerBarWidth + gap)}
                y={containerHeight - maxBarHeight - 5}
                width={outerBarWidth}
                height={maxBarHeight}
                stroke="#FF007F"
                strokeWidth="2"
                fill="none"
                rx="2"
              />
              {/* Inner Filled Part */}
              <rect
                x={i * (outerBarWidth + gap) + (outerBarWidth - barWidth) / 2}
                y={containerHeight - barHeight - 5}
                width={barWidth}
                height={barHeight}
                fill={getBarColor(value)}
                rx="2"
              />
              {/* Labels Below Bars */}
              {labels[i] && (
                <text
                  x={i * (outerBarWidth + gap) + outerBarWidth / 1}
                  y={containerHeight + 10}
                  fontSize="10"
                  fill="white"
                  textAnchor="middle"
                  transform={`rotate(90, ${i * (outerBarWidth + gap) + outerBarWidth / 2}, ${containerHeight + 10})`}
                >
                  {labels[i]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MultiBarGraph;
