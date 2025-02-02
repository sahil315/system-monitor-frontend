/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from "react";
import GaugeChart from "react-gauge-chart";
import styled from "styled-components";
import { Title } from "../styles";
import CircularMeter from "./CircularMeter";
import cpuImage from "../assets/cpu.png";
import { GaugeComponent } from 'react-gauge-component';

const CPU = ({ stats, layout }) => {
  if (!stats || !stats.cpu) return null;

  // Extract CPU Data
  const cpuTemp = parseFloat(stats.cpu.temp?.find(t => t.name === "Core Max")?.value) || 0;
  const cpuUsage = parseFloat(stats.cpu.load?.find(l => l.name === "CPU Total")?.value) || 0;
  const cpuClock = parseFloat(stats.cpu.clock?.find(c => c.name.includes("CPU Core #1"))?.value) || 0;

  // Use useRef to store the previous clock speed
  const clockSpeedRef = useRef(cpuClock);

  // Update the ref value only when a valid clock speed is received
  useEffect(() => {
    if (cpuClock > 0) {
      clockSpeedRef.current = cpuClock;
    }
  }, [cpuClock]);

  return (
    <CpuCard layout={layout}>
      {/* CPU Image */}
      <ImageContainer>
        <img src={cpuImage} alt="CPU" />
      </ImageContainer>

      <StatsContainer>
        <Title>CPU Stats</Title>

        {/* CPU Temperature Circular Meter */}
        {/* <CircularMeter value={`${cpuTemp}°C`} label="CPU Temp" color="#FF007F" /> */}
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
          value={cpuTemp}
          minValue={0}
          maxValue={100}
        />
        {/* Clock Speed Gauge with Prevented Reset */}
      
        <GaugeComponent
          value={clockSpeedRef.current}
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
        {/* CPU Load Gauge */}
        {/* <GaugeChart 
          id="cpu-load"
          nrOfLevels={30}
          percent={cpuUsage / 100}
          colors={["#0080FF", "#FFFF00", "#FF0000"]}
          arcWidth={0.3}
          textColor="white"
          needleColor="white"
          formatTextValue={() => `${cpuUsage.toFixed(1)}%`}
          animate={true}
          animDelay={300}
        /> */}
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
          value={cpuUsage}
        />
      </StatsContainer>
    </CpuCard>
  );
};

export default CPU;

const CpuCard = styled.div`
  display: flex;
  background: #1a2433;
  padding: 15px;
  border-radius: 10px;
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
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
          