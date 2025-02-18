import React from "react";

const ClockSpeedGauge = ({ speed, size, radiusOuter, radiusInner,numSegments,maxSpeed }) => {
  // const maxSpeed = 6000; // Maximum speed
  // const numSegments = 20; // 10 segments (each 36 degrees apart)
  const filledSegments = Math.round((speed / maxSpeed) * numSegments);
  // const size = 220; // Outer size
  const center = size / 2;
  // const radiusOuter = 75; // Outer circle radius
  // const radiusInner = 50; // Inner circle radius
  const segmentAngle = 360 / numSegments;
  const gap = 3 * (Math.PI / 180); // Increased gap to 3px equivalent

  // Updated color palette
  const colorPalette = ["#39C0ED", "#00FFFF", "#8A42A6", "#FF007F"];

  // Function to determine segment color dynamically
  const getSegmentColor = (index) => {
    if (index < filledSegments) {
      return colorPalette[Math.floor((index / numSegments) * colorPalette.length)];
    }
    return "#222"; // Dark muted color for inactive segments
  };

  return (
    <div style={styles.container}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer Circle */}
        <circle cx={center} cy={center} r={radiusOuter} fill="none" stroke="#0ABDE3" strokeWidth="8" opacity="0.6" />
        {/* Inner Circle */}
        <circle cx={center} cy={center} r={radiusInner} fill="none" stroke="#0ABDE3" strokeWidth="6" opacity="0.6" />

        {/* Segments with Arc Top and Bottom and Gaps */}
        {Array.from({ length: numSegments }).map((_, i) => {
          const angle = i * segmentAngle;
          const radianStart = ((angle + gap) * Math.PI) / 180;
          const radianEnd = ((angle + segmentAngle - gap) * Math.PI) / 180;
          
          const x1 = center + radiusInner * Math.cos(radianStart);
          const y1 = center + radiusInner * Math.sin(radianStart);
          const x2 = center + radiusOuter * Math.cos(radianStart);
          const y2 = center + radiusOuter * Math.sin(radianStart);
          const x3 = center + radiusOuter * Math.cos(radianEnd);
          const y3 = center + radiusOuter * Math.sin(radianEnd);
          const x4 = center + radiusInner * Math.cos(radianEnd);
          const y4 = center + radiusInner * Math.sin(radianEnd);
          
          return (
            <path
              key={i}
              d={`M ${x1},${y1} A ${radiusInner} ${radiusInner} 0 0 1 ${x4},${y4} 
                 L ${x3},${y3} A ${radiusOuter} ${radiusOuter} 0 0 0 ${x2},${y2} Z`}
              fill={getSegmentColor(i)}
              stroke="#111" strokeWidth="2" strokeLinejoin="round"
            />
          );
        })}

        {/* Speed Display */}
        <text x={center} y={center} textAnchor="middle" dy="5" fontSize="12" fill="white" fontWeight="bold">
          {speed} MHz
        </text>
      </svg>
    </div>
  );
};

// Fix layout with proper container styling
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    padding: 10,
    borderRadius: "50%",
    alignContent: "flex-start",
    flexWrap: "wrap",
    height: "max-content",
  },
};

export default ClockSpeedGauge;
