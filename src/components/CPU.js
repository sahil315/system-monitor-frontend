import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Title } from "../styles";
import cpuImage from "../assets/noun-cpu.svg";
import { GaugeComponent } from 'react-gauge-component';
import CPUUsageSVG from "./../assets/CPUUsageSVG";
import CircularGauge from './CircularGauge';
import ClockSpeedGauge from './ClockSpeedGauge';
import MultiBarGraph  from './MultiBarGraph'

// 🛠️ Define refs before conditional return to fix ESLint warning

const CPU = ({ stats, layout }) => {
  // ❌ DO NOT call hooks conditionally
  const clockSpeedRef = useRef(0);

  useEffect(() => {
    if (stats && stats.cpu) {
      const cpuClock = parseFloat(stats.cpu.clock?.find(c => c.name.includes("CPU Core #1"))?.value) || 0;
      if (cpuClock > 0) {
        clockSpeedRef.current = cpuClock;
      }
    }
  }, [stats]);

  if (!stats || !stats.cpu) return null;
console.log('stats.cpu?.Voltages?.length'  + JSON.stringify(stats.cpu))
  // Extract CPU Data
  const cpuTemp = parseFloat(stats.cpu.temp?.find(t => t.name === "Core Max")?.value) || 0;
  const cpuUsage = parseFloat(stats.cpu.load?.find(l => l.name === "CPU Total")?.value) || 0;
  const cpuPower = parseFloat(stats.cpu.power?.find(p => p.name === "CPU Package")?.value) || 0;
  const cpuVoltage = parseFloat(stats.cpu.voltage?.find(v => v.name === "CPU Core")?.value) || 0;

  return (
    <MainCard layout={layout}>
    <CpuCard layout={layout}>
      <ImageContainer>
        {/* <img src={cpuImage} className="Leftimage" alt="CPU" /> */}
        <CPUUsageSVG usage={cpuUsage} />
      </ImageContainer>

      <StatsContainer>
        {/* Left Column - CPU Temperature Gauge (Bigger) */}
        <TempAndClock>
          
        
         
           
            {/* <FanGrid>
              <FanLabel>Voltage</FanLabel>
              <FanLabel>Power</FanLabel>
              <FanValue>{cpuVoltage} V</FanValue>
              <FanValue>{cpuPower} W</FanValue>
            </FanGrid> */}
          


        
        <BigGaugeContainer>
          <CircularGauge 
              size = {260} 
              radius = {100}
              numSegments={70}
              barWidth={5.5}
              barGap={5}
              percentage={parseFloat(cpuTemp)} 
            />{/* Your big gauge component */}
        </BigGaugeContainer>
        
        <RightContainer>
          <SmallGaugeContainer>
            <ClockSpeedGauge 
              size = {160} 
              radiusOuter = {75} 
              radiusInner = {50} 
              speed={clockSpeedRef.current}
              numSegments={20}
              maxSpeed={6000}
            
            /> {/* Your small gauge component */}
          </SmallGaugeContainer>
          
          <BarGraphContainer>
            <MultiBarGraph 
              bars={stats.cpu?.power?.length || 0} 
              values={stats.cpu?.power?.map(v => parseFloat(v.value)) || []} 
              labels={stats.cpu?.power?.map(v => v.name) || []} 
              maxValue={100}
              maxBarHeight = {60}
                barWidth = {15}
                outerBarWidth = {18}
                gap = {5}
                containerHeight = {80}
            />
            <MultiBarGraph 
            bars={stats.cpu?.voltage?.length || 0} 
            values={stats.cpu?.voltage?.map(v => parseFloat(v.value)) || []} 
            labels={stats.cpu?.voltage?.map(v => v.name) || []} 
            maxValue={5} 
            maxBarHeight = {60}
                barWidth = {15}
                outerBarWidth = {18}
                gap = {5}
                containerHeight = {80}
          />
          </BarGraphContainer>
        </RightContainer>
        {/* Top Right - Clock Speed Gauge */}
        </TempAndClock>
        
      </StatsContainer>

      
         
          
  

    </CpuCard>
    </MainCard>
  );
};

export default CPU;
const MainCard = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "calc(100vw / 2 - 20px);" : "100%")};
`;
/* Styled Components */
const CpuCard = styled.div`
   display: grid;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    ". .";
  background: #1a2433;
  height:100%;
  border-radius: 10px;
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;
const TempAndClock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

// Left side (Big Gauge)
const BigGaugeContainer = styled.div`
  flex: 1; /* Takes full height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Right side (Small Gauge + Bar Graph)
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%; /* Adjust width as needed */
  height: 100%;
`;

// Small Gauge (Top 50%)
const SmallGaugeContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Bar Graph (Bottom 50%)
const BarGraphContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageContainer = styled.div`
  width: 80%;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }

  /* Overlay for fill effect */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: ${({ cpuTemp }) => cpuTemp}%;
    background: #0080FF; /* Use gradient if needed */
    clip-path: polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%);
    opacity: 0.6;
  }
`;

/* Layout with 4 items in 2x2 grid & last row spanning full width */
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns */
  grid-template-rows: 1fr auto; /* First row = Big, Second row = Small */
  gap: 10px;
  width: 60%;
  align-items: center;

  /* Layout for each component */
  & .cpu-gauge { height: 300px; width:300px; grid-column: 1 / span 1; grid-row: 1 / span 2; } /* Big Temp Gauge on Left */
  & .clock-gauge { height: 300px; width:300px; grid-column: 2 / span 1; grid-row: 1 / span 1; } /* Clock Gauge on Top Right */
  & .stat-text { grid-column: 2 / span 1; grid-row: 2 / span 1; } /* Voltage & Power on Bottom Right */
`;

const StatText = styled.div`
  font-size: 14px;
  color: #00ffcc;
  text-align: center;
  font-weight: bold;
`;

const FanContainer = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  background: #1a2433;
  padding: 10px;
  border-radius: 8px;
  width: 100px; /* Small box */
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const FanTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ff007f;
  margin-bottom: 5px;
`;

const FanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
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