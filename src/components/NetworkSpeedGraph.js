import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const NetworkSpeedGraph = ({ dataProp, type }) => {
  const [data, setData] = useState([]);

  // Function to convert speed string (KB/s or MB/s) to number in KB/s
  const parseSpeed = (speed) => {
    if (!speed) return 0;
    const value = parseFloat(speed);
    return speed.includes("MB/s") ? value * 1024 : value; // Convert MB/s to KB/s
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = {
          time: new Date().toLocaleTimeString().split(" ")[0], // Format for better readability
          speed1: parseSpeed(dataProp.speed1),
          speed2: parseSpeed(dataProp.speed2),
        };

        // Keep last 30 points to maintain smooth updates
        return [...prevData.slice(-29), newData];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dataProp]);

  return (
    <div style={{ width: 300, height: 150 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSpeed1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff007f" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#ff007f" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSpeed2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ffff" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#00ffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#cccccc" }} />
          <YAxis tick={{ fontSize: 10, fill: "#cccccc" }} domain={[0, 'auto']} />
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <Tooltip 
            contentStyle={{ backgroundColor: "#222", borderRadius: "5px", border: "none", color: "#fff" }} 
            labelStyle={{ color: "#fff" }} 
            formatter={(value) => `${value.toFixed(1)} KB/s`}
          />
          <Area 
            type="monotone" 
            dataKey="speed1" 
            stroke="#ff007f" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorSpeed1)" 
          />
          <Area 
            type="monotone" 
            dataKey="speed2" 
            stroke="#00ffff" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorSpeed2)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworkSpeedGraph;
