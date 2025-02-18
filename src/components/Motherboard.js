import React from "react";
import styled from "styled-components";
import CircularMeter from "./CircularMeter";
import motherboardImage from "../assets/noun-motherboard.svg";
import GaugeComponent from 'react-gauge-component';
import { Chart } from "react-google-charts";
import ApexCharts from 'apexcharts'
import CircularGauge from './CircularGauge';
import MultiBarGraph  from './MultiBarGraph';
import { MainCard, MotherboardCard, ImageContainer, StatItem } from "../styles";


const Motherboard = ({ stats, layout }) => {
  console.log('stats?.motherboard?.fans ' + JSON.stringify(stats?.motherboard?.fans[0].value))
  const mainBoardTemp = stats?.motherboard?.temps?.[0]?.value || "N/A";
  const mainVoltage = parseFloat(stats?.motherboard?.voltages?.find(v => v.name.includes("Voltage #1"))?.value) || "N/A";
  const fans = parseFloat(stats?.motherboard?.fans[0]?.value) || 0;
  // const cpuVoltage = parseFloat(stats.cpu.voltage?.find(v => v.name === "CPU Core")?.value) || 0;
  // const gpuFanSpeed = parseFloat(stats?.gpu?.fan_rpm?.find(f => f.name === "GPU Fan")?.value) || 0;
console.log('stats?.motherboard?.voltages?.map(v => parseFloat(v.Value)) || [] '  +JSON.stringify(stats?.motherboard?.voltages))
  return (
    <MainCard layout={layout}>
      <MotherboardCard layout={layout}>
        <ImageContainer>
          <img className="Leftimage" src={motherboardImage} alt="Motherboard" />
        </ImageContainer>

        <StatsContainer>
          
          
          <CircularGauge 
            size = {260} 
            radius = {100}
            numSegments={70}
            barWidth={5.5}
            barGap={5}
            percentage={parseFloat(mainBoardTemp)} 
          />
          <MultiBarGraph 
            bars={stats?.motherboard?.voltages?.length || 0} 
            values={stats?.motherboard?.voltages?.map(v => parseFloat(v.value)) || []} 
            labels={stats?.motherboard?.voltages?.map(v => v.name) || []} 
            maxValue={5}
            maxBarHeight = {90}
            barWidth = {25}
            outerBarWidth = {28}
            gap = {5}
            containerHeight = {100}
          />
          {/* <StatItem><strong>Volage:</strong> {mainVoltage}</StatItem> */}
          
          
          <ChartContainer className="item-3">
          
          </ChartContainer>
        </StatsContainer>
      </MotherboardCard>
    </MainCard>
  );
};
// const MainCard = styled.div`
//   width: ${({ layout }) => (layout === "landscape" ? "calc(100vw / 2 - 20px);" : "100%")};
// `;

// const MotherboardCard = styled.div`
//    display: grid;
//   grid-template-columns: 0.5fr 1.5fr;
//   grid-template-rows: 1fr;
//   gap: 0px 0px;
//   grid-auto-flow: row;
//   grid-template-areas:
//     ". .";
//   background: #1a2433;
//   height:100%;
//   border-radius: 10px;
//   width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
//   align-items: center;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
// `;
const ChartContainer = styled.div`

`;
// const ImageContainer = styled.div`
//   width: 40%;
//   img {
//   width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
//     height: auto;
//   }
// `;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 70%;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  padding: 0px 40px;
`;


// const StatItem = styled.div`
//   font-size: 14px;
//   color: #00ffcc;
// `;

const FanContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const FanLabel = styled.div`
  font-size: 12px;
  color: #00ffcc;
  text-align: center;
`;

export default Motherboard;
