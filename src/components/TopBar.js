import React, { useState, useEffect } from "react";
import styled from "styled-components";
import topBarImage from "../assets/top.png";
import FPSStats from "react-fps-stats";
import { GaugeComponent } from 'react-gauge-component';

const TopBar = ({ stats, layout }) => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;

    const calculateFPS = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastFrameTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = now;
      }

      requestAnimationFrame(calculateFPS);
    };

    requestAnimationFrame(calculateFPS);

    return () => cancelAnimationFrame(calculateFPS);
  }, []);


  const convertSpeedToKbps = (speedStr) => {
    if (!speedStr) return 0;
  
    const numericValue = parseFloat(speedStr);
  
    if (speedStr.includes("MB")) {
      return numericValue * 1000;  // Convert MB/s to KB/s
    } else {
      return numericValue;  // Already in KB/s
    }
  };
  
  const formatSpeed = (kbps) => {
    if (kbps >= 1000) {
      return (kbps / 1000).toFixed(1) + " MB/s"; // Convert back to MB/s for display
    } else {
      return kbps.toFixed(0) + " KB/s"; // Keep in KB/s
    }
  };
  return (
    <TopBarContainer>
      {/* Left Stats */}
      <LeftStats>
        {/* <p><strong>Download:</strong> {stats?.network.received} || {stats?.network.downloaded}</p>
        <p><strong>Upload:</strong> {stats?.network.sent} || {stats?.network.uploaded}</p> */}
        <GaugeComponent
          arc={{
            nbSubArcs: 150,
            colorArray: ['#5BE12C', '#F5CD19', '#EA4228'], // Green, Yellow, Red
            width: 0.3,
            padding: 0.003
          }}
          labels={{
            valueLabel: {
              style: { fontSize: 40 },
              formatTextValue: formatSpeed
            },
            tickLabels: {
              type: "outer",
              ticks: [
                { value: 1000 }, { value: 5000 },
                { value: 10000 }, { value: 20000 }, { value: 50000 }, { value: 75000 },
                { value: 100000 }
              ],
              defaultTickValueConfig: {
                formatTextValue: formatSpeed
              }
            }
          }}
          value={convertSpeedToKbps(stats?.network.received)} // Convert received speed to KB/s
          maxValue={100000} // Adjusted to 100 MB/s
        />
      </LeftStats>

      {/* Network Image in Center */}
      <ImageWrapper>
        <img className="top-image" src={topBarImage} alt="Top Bar" />
      </ImageWrapper>

      {/* Right Stats */}
      <RightStats>
        <p><strong>FPS:</strong> {fps}</p>
        <p><strong>Uptime:</strong> {Math.floor(stats?.uptime / 60)} min</p>
      </RightStats>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e293b;
  padding: 10px 20px;
  color: white;
  font-size: 14px;
  position: relative;
  width: 100%;
`;

// Image in the Center
const ImageWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  img {
    height: 40px;
  }
`;

// Stats on Left
const LeftStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// Stats on Right
const RightStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default TopBar;
