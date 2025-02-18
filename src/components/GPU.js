import React from "react";
import { Title } from "../styles";
import CircularMeter from "./CircularMeter";
import { Chart } from "react-google-charts";
import styled from "styled-components";
import gpuImage from "../assets/gpu.svg";
import GPUUsageSVG from "./../assets/GPUUsageSVG";
import GaugeSVG from "./../assets/GaugeSVG";
import { GaugeComponent } from 'react-gauge-component';
import CircularGauge from './CircularGauge';
import ClockSpeedGauge from './ClockSpeedGauge';
import MultiBarGraph  from './MultiBarGraph'
import { MainCard, GpuCard, ImageContainer, StatsContainer, StatItem } from "../styles";

const GPU = ({ stats, layout }) => {
  if (!stats) return null;

  const gpuTemp = parseFloat(stats?.gpu?.temp?.find(t => t.name === "GPU Core")?.value) || 0;
  const gpuClock = parseFloat(stats?.gpu?.clock?.find(c => c.name === "GPU Core")?.value) || 0;
  const gpuMemoryClock = parseFloat(stats?.gpu?.clock?.find(c => c.name === "GPU Memory")?.value) || 0;
  const gpuUsage = parseFloat(stats?.gpu?.load?.find(l => l.name === "GPU Core")?.value) || 0;
  const gpuVRAMUsed = parseFloat(stats?.gpu?.memory["GPU Memory Used"]) || 0;
  const gpuVRAMTotal = parseFloat(stats?.gpu?.memory["GPU Memory Total"]) || 1;

  return (
      <MainCard layout={layout}>
        <GpuCard layout={layout}>
          {/* Left GPU Image */}
          <ImageContainer layout={layout}>
            <GaugeSVG className="Leftimage" usage={50} />
          </ImageContainer>

          {/* Right Section */}
          <StatsContainer layout={layout}>

            {/* 🔹 Top Layout - 3 Gauges + 1 Semi Arc */}
            <TopContainer>
              <CircularGauge size={260} radius={100} numSegments={70} barWidth={5.5} barGap={5} percentage={gpuTemp} />
              <ClockSpeedGauge size={180} radiusOuter={75} radiusInner={50} speed={gpuClock} numSegments={20} maxSpeed={6000} />
              <GaugeComponent
                type="semicircle"
                arc={{
                  colorArray: ['#00FF15', '#FF2121'],
                  padding: 0.02,
                  subArcs: [{ limit: 40 }, { limit: 60 }, { limit: 70 }, {}, {}, {}, {}]
                }}
                pointer={{ type: "blob", animationDelay: 0 }}
                value={gpuUsage}
              />
              <ClockSpeedGauge size={180} radiusOuter={75} radiusInner={50} speed={gpuMemoryClock} numSegments={20} maxSpeed={10000} />
              
            </TopContainer>

            {/* 🔹 Bottom Layout - VRAM BarFill + MultiBarGraph */}
            <BottomContainer>
             
              <RamBars className="rammbarss">
                <StatItem>
                  <span style={{ color: "#FF007F" }}>Used: {gpuVRAMUsed} GB</span> | 
                  <span style={{ color: "#00FFCC" }}> Free: {(gpuVRAMTotal - gpuVRAMUsed).toFixed(2)} GB</span>
                </StatItem>
                <BarContainer >
                  <BarFill used={(gpuVRAMUsed / gpuVRAMTotal) * 100} color={
                        (gpuVRAMUsed / gpuVRAMTotal) * 100 > 80 ? "#FF007F" : 
                        (gpuVRAMUsed / gpuVRAMTotal) * 100 > 50 ? "#FFD700" : 
                        "#00ffff"
                  } />
                </BarContainer>
              </RamBars>
              <MultiBarGraph 
                bars={stats.gpu?.load?.length || 0} 
                values={stats.gpu?.load?.map(v => parseFloat(v.value)) || []} 
                labels={stats.gpu?.load?.map(v => v.name) || []} 
                maxValue={25} 
                maxBarHeight = {80}
                barWidth = {25}
                outerBarWidth = {28}
                gap = {10}
                containerHeight = {100}


              />
            </BottomContainer>

          </StatsContainer>
        </GpuCard>
      </MainCard>
  );
};


// const MainCard = styled.div`
//   width: ${({ layout }) => (layout === "landscape" ? "calc(100vw / 2 - 20px)" : "100%")};
// `;

// const GpuCard = styled.div`
//   display: flex;
//   background: #1a2433;
//   height: 100%;
//   border-radius: 10px;
//   width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
//   align-items: center;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
// `;

// const StatsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 60%;
// `;

/* 🔹 Top Layout - Gauges */
const TopContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
`;

/* 🔹 Bottom Layout - BarFill + MultiBarGraph */
const BottomContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction:column;
  padding: 0px 80px;
`;

const RamBars = styled.div`
  width: 300px;
  height: 100%;
`;

const BarContainer = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "450px")};
  height: 45px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;
`;

const BarFill = styled.div`
  width: ${(props) => props.used}%;
  height: 100%;
  background: ${(props) => props.color};
`;

// const StatItem = styled.div`
//   font-size: 14px;
//   color: #00ffcc;
// `;


export default GPU;
