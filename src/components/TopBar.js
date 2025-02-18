import React, { useState, useEffect } from "react";
import styled from "styled-components";
import topBarImage from "../assets/noun-router.svg";
// import FPSStats from "react-fps-stats";
import { GaugeComponent } from 'react-gauge-component';
import NetworkSpeedGraph from "./NetworkSpeedGraph";
import FanSVG from './../assets/FanSVG'
import FPSMonitor from './FPSMonitor';
import MonitorUI  from './MonitorUI';


const TopBar = ({ stats, layout }) => {
  const [fps, setFps] = useState(0);
  console.log("📡 stats data:", stats?.network?.sent);

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
  const gpuFanSpeed = parseFloat(stats?.gpu?.fan_rpm?.find(f => f.name === "GPU Fan")?.value) || 0;
  const cpuFanSpeed = parseFloat(stats?.motherboard?.fans?.[0]?.value) || 0;
  console.log('stats?.network ' + JSON.stringify(stats?.network))
  return (
    <TopBarContainer>
      {/* Left Stats */}
      <LeftStats>
        {/* <p><strong>Download:</strong> {stats?.network.received} || {stats?.network.downloaded}</p>
        <p><strong>Upload:</strong> {stats?.network.sent} || {stats?.network.uploaded}</p> */}
        {/* <GaugeComponent
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
          value={convertSpeedToKbps(stats?.network?.received)} // Convert received speed to KB/s
          maxValue={100000} // Adjusted to 100 MB/s
        /> */}
        <NetworkContainer>
          <NetworkSpeedGraph
            dataProp={{
              speed1: stats?.network?.received, 
              speed2: stats?.network?.sent 
            }} 
            type="network"
          />
          <NetworkGrid>
            <FanLabel style={{color: "#ff007f"}}>d:</FanLabel>
            <FanValue style={{color: "#ff007f"}}>{stats?.network?.received} </FanValue>
            <FanLabel style={{color: "#00ffff"}}>u:</FanLabel>
            <FanValue style={{color: "#00ffff"}}>{stats?.network?.sent} </FanValue>
          </NetworkGrid>
        </NetworkContainer>
        
        <FanContainer>
          {/* <FanTitle>FAN</FanTitle>
          <FanGrid>
            <FanLabel>CPU</FanLabel>
            <FanLabel>GPU</FanLabel>
            <FanValue>{cpuFanSpeed} RPM</FanValue>
            <FanValue>{gpuFanSpeed} RPM</FanValue>
          </FanGrid> */}
          <FanGrid>
            <FanInnerGrid>
              <FanTitle>CPU Fans</FanTitle>
              <FanSVG speed={cpuFanSpeed} />
              <FanValue>{cpuFanSpeed} RPM</FanValue>
            </FanInnerGrid>
            <FanInnerGrid>
            <FanTitle>GPU Fans</FanTitle>
              <FanSVG speed={gpuFanSpeed} />
              <FanValue>{gpuFanSpeed} RPM</FanValue>
            </FanInnerGrid>
          </FanGrid> 
        </FanContainer>
      </LeftStats>        


      {/* Network Image in Center */}
      {/* <ImageWrapper>
        <img className="top-image" src={topBarImage} alt="Top Bar" />
      </ImageWrapper> */}

      {/* Right Stats */}
      <RightStats>
      {/* <FPSMonitor   /> */}

      <MonitorUI resolution="2560 x 1440" refreshRate="144 Hz" audioLevel={58} />
        {/* <p><strong>FPS:</strong> {fps}</p>
        <p><strong>Uptime:</strong> {Math.floor(stats?.uptime / 60)} min</p> */}
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

const NetworkGrid = styled.div`
    display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  justify-items:center;
  width: 80%;
    justify-self: end;
`;
const NetworkContainer = styled.div`
  width:300px;
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
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
`;

// Stats on Right
const RightStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FanContainer = styled.div`
  display: flex;
  margin: 0px 20px;
    min-width: 350px;
  min-height: 150px;
  flex-direction: column;
  align-items: center;
  background: #1a2433;
  padding: 10px;
  border-radius: 8px;
  // width: 100px; /* Small box */
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const FanTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ff007f;
  margin-bottom: 5px;
`;

const FanInnerGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const FanGrid = styled.div`
  display: flex;
`;

const FanLabel = styled.div`
  font-size: 12px;
  color: #00ffff;
  font-weight: bold;
`;

const FanValue = styled.div`
  font-size: 12px;
  color: #ffffff;
`;


export default TopBar;
