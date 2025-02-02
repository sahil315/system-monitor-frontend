import React from "react";
import styled from "styled-components";
import CircularMeter from "./CircularMeter";
import motherboardImage from "../assets/motherboard.png";
import GaugeComponent from 'react-gauge-component';

const MotherboardCard = styled.div`
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
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
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

const Motherboard = ({ stats, layout }) => {
  const mainBoardTemp = stats?.motherboard?.temps?.[0]?.value || "N/A";
  const mainVoltage = stats?.motherboard?.voltages?.find(v => v.name.includes("Voltage #1"))?.value || "N/A";
  const fans = stats?.motherboard?.fans || [];

  return (
    <MotherboardCard layout={layout}>
      <ImageContainer>
        <img src={motherboardImage} alt="Motherboard" />
      </ImageContainer>

      <StatsContainer>
        
        <GaugeComponent
          arc={{
            subArcs: [
              {
                limit: 40,
                color: '#5BE12C',
                showTick: true
              },
              {
                limit: 60,
                color: '#F5CD19',
                showTick: true
              },
              {
                limit: 80,
                color: '#F58B19',
                showTick: true
              },
              {
                limit: 100,
                color: '#EA4228',
                showTick: true
              },
            ]
          }}
          labels={{
            valueLabel: { formatTextValue: value => value + 'ºC' },
            tickLabels: {
              type: 'outer',
              defaultTickValueConfig: { 
                formatTextValue: (value: any) => value + 'ºC' ,
                style: {fontSize: 10}
            },
              ticks: [
                { value: 13 },
                { value: 22.5 },
                { value: 32 }
              ],
            }
          }}
          value={parseFloat(mainBoardTemp)}
        />
        <StatItem><strong>Voltage:</strong> {mainVoltage}</StatItem>

        <FanContainer>
          {fans.slice(0, 3).map((fan, index) => (
            <div key={index}>
              <FanLabel>Fan {index + 1}</FanLabel>
              <StatItem>{fan.value}</StatItem>
            </div>
          ))}
        </FanContainer>
      </StatsContainer>
    </MotherboardCard>
  );
};

export default Motherboard;
