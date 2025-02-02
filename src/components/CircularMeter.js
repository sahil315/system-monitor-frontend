import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularMeter = ({ value, label, color }) => {
  return (
    <div style={{ width: "120px", textAlign: "center" }}>
      <CircularProgressbar
        value={value}
        text={`${value}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: color,
          trailColor: "#444",
        })}
      />
      <p style={{ marginTop: "10px", fontSize: "14px", color: "#fff" }}>
        {label}
      </p>
    </div>
  );
};

export default CircularMeter;
