import React from "react";
import { Title } from "../styles";
import CircularMeter from "./CircularMeter";
import { Chart } from "react-google-charts";
import styled from "styled-components";
import gpuImage from "../assets/gpu.png";

import { GaugeComponent } from 'react-gauge-component';

const GPU = ({ stats, layout }) => {
  if (!stats) return null;

  const gpuTemp = parseFloat(stats?.gpu?.temp?.find(t => t.name === "GPU Core")?.value) || 0;
  const gpuClock = parseFloat(stats?.gpu?.clock?.find(c => c.name === "GPU Core")?.value) || 0;
  const gpuUsage = parseFloat(stats?.gpu?.load?.find(l => l.name === "GPU Core")?.value) || 0;
  const gpuVRAMUsed = parseFloat(stats?.gpu?.memory["GPU Memory Used"]) || 0;
  const gpuVRAMTotal = parseFloat(stats?.gpu?.memory["GPU Memory Total"]) || 1;
  const gpuFanSpeed = parseFloat(stats?.gpu?.fan_rpm?.find(f => f.name === "GPU Fan")?.value) || 0;

  return (
    <GpuCard layout={layout}>
      {/* GPU Image */}
      <ImageContainer layout={layout}>
        <img src={gpuImage} alt="GPU" />
      </ImageContainer>

      <StatsContainer layout={layout}>
        <Title>GPU Stats</Title>

        {/* GPU Temperature */}
        {/* <CircularMeter value={`${gpuTemp}°C`} label="GPU Temp" color="#0080FF" /> */}
        <GaugeComponent
          type="semicircle"
          arc={{
            width: 0.2,
            padding: 0.005,
            cornerRadius: 1,
            // gradient: true,
            subArcs: [
              // {
              //   limit: 30,
              //   color: '#5BE12C',
              //   showTick: true,
              //   tooltip: {
              //     text: 'Too low temperature!'
              //   },
              //   onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
              //   onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
              //   onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
              // },
              
              {
                limit: 50,
                color: '#5BE12C',
                showTick: true,
                tooltip: {
                  text: 'OK temperature!'
                }
              },
              {
                limit: 75, color: '#F5CD19', showTick: true,
                tooltip: {
                  text: 'High temperature!'
                }
              },
              { limit: 80,
                color: '#EA4228',
                tooltip: {
                  text: 'Too high temperature!'
                }
              }
            ]
          }}
          pointer={{
            color: '#345243',
            length: 0.80,
            width: 15,
            // elastic: true,
          }}
          labels={{
            valueLabel: { formatTextValue: value => value + 'ºC' },
            tickLabels: {
              type: 'outer',
              defaultTickValueConfig: { 
                formatTextValue: (value: any) => value + 'ºC' ,
                style: {fontSize: 10}
            },
              // ticks: [
              //   { value: 13 },
              //   { value: 22.5 },
              //   { value: 32 }
              // ],
            }
          }}
          value={gpuTemp}
          minValue={0}
          maxValue={100}
        />
        {/* GPU Clock Speed Gauge */}
        {/* <Chart
          width={"100%"}
          height={"120px"}
          chartType="Gauge"
          loader={<div>Loading Chart</div>}
          data={[
            ["Label", "Value"],
            ["MHz", gpuClock],
          ]}
          options={{
            redFrom: 2200,
            redTo: 2800,
            yellowFrom: 1800,
            yellowTo: 2200,
            minorTicks: 5,
            max: 3000,
          }}
        /> */}
        <GaugeComponent
          value={gpuClock}
          type="radial"
          minValue={0}
          maxValue={5500} // Assuming max clock speed ~5500 MHz
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 1000 },
                { value: 2000 },
                { value: 3000 },
                { value: 4000 },
                { value: 5000 },
                { value: 5500 }
              ]
            }
          }}
          arc={{
            colorArray: ["#0080FF", "#00FF00", "#FF0000"],
            subArcs: [{ limit: 1000 }, { limit: 2000 }, { limit: 3000 }, { limit: 4000 },{ limit: 5000 }],
            padding: 0.02,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
        {/* VRAM Usage - Horizontal Bar */}
        <StatItem><strong>VRAM:</strong> {gpuVRAMUsed} GB / {gpuVRAMTotal} GB</StatItem>
        

        {/* GPU Load Percentage */}
        {/* <StatItem><strong>GPU Usage:</strong> {gpuUsage}%</StatItem> */}
        <GaugeComponent
          type="semicircle"
          arc={{
            colorArray: ['#00FF15', '#FF2121'],
            padding: 0.02,
            subArcs:
              [
                { limit: 40 },
                { limit: 60 },
                { limit: 70 },
                {},
                {},
                {},
                {}
              ]
          }}
          pointer={{type: "blob", animationDelay: 0 }}
          value={gpuUsage}
        />
        <BarContainer>
          <BarFill used={(gpuVRAMUsed / gpuVRAMTotal) * 100} color={
              (gpuVRAMUsed / gpuVRAMTotal) * 100 > 80 ? "#red" :  // Red (Critical)
              (gpuVRAMUsed / gpuVRAMTotal) * 100 > 50 ? "#FFD700" :  // Yellow (Warning)
              "#00FF00" // Green (Safe)
            } 
          />
          {/* <BarFill used={(gpuVRAMUsed / gpuVRAMTotal) * 100} /> */}
        </BarContainer>
        {/* Fan Speed Circular Meter */}
        {/* <CircularMeter value={`${gpuFanSpeed} RPM`} label="Fan Speed" color="#FF007F" /> */}
        <Chart
          width={"100%"}
          height={"120px"}
          chartType="Gauge"
          loader={<div>Loading Chart</div>}
          data={[
            ["Label", "Value"],
            ["RPM", gpuFanSpeed],
          ]}
          options={{
            redFrom: 2200,
            redTo: 3000,
            yellowFrom: 1501,
            yellowTo: 2200,
            greenFrom: 1,
            greenTo:1500,
            minorTicks: 5,
            max: 3000,
          }}
        />
      </StatsContainer>
    </GpuCard>
  );
};


/* Styled Components */
const GpuCard = styled.div`
  display: flex;
  background: #1a2433;
  padding: 15px;
  border-radius: 10px;
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const BarContainer = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "35%")};
  height: 15px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;
`;

const BarFill = styled.div`
  width: ${(props) => props.used}%;
  height: 100%;
  background: #00FF00;
`;

const ImageContainer = styled.div`
  width: 40%;
  img {
    width: 100%;
    height: auto;
  }
`;

const StatsContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const StatItem = styled.div`
  font-size: 14px;
  color: #00ffcc;
`;

export default GPU;
