import React from "react";
import { Chart } from "react-google-charts";
import styled from "styled-components";
import ramSSDImage from "../assets/ssd.png";
import ramImage from "../assets/ram.png";
import { GaugeComponent } from 'react-gauge-component';

const RAMSSD = ({ stats, layout }) => {
  if (!stats) return null;

  const ramLoad = parseFloat(stats?.ram?.load) || 0;
  const ramUsed = parseFloat(stats?.ram?.used) || 0;
  const ramAvailable = parseFloat(stats?.ram?.available) || 0;
  const ramTotal = ramUsed + ramAvailable;


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
    <RamCard layout={layout}>
      {/* RAM Section */}
      <StatsContainer>
        <Title>RAM & Storage</Title>
        <RamContainerCard>
          {/* RAM Image */}
          <ImageContainer>
            <img src={ramImage} alt="RAM & SSD" />
          </ImageContainer>

          {/* RAM Gauge for Load */}
          <Chart
            width={"100%"}
            height={"120px"}
            chartType="Gauge"
            loader={<div>Loading Chart</div>}
            data={[
              ["Label", "Value"],
              ["Load", ramLoad],
            ]}
            options={{
              redFrom: 80,
              redTo: 100,
              yellowFrom: 50,
              yellowTo: 80,
              minorTicks: 5,
              max: 100,
            }}
          />

          {/* RAM Bar Graph (Total, Used, Free) */}
          <StatItem><strong>RAM:</strong> 31.8 GB</StatItem>

          {/* Calculate RAM Usage Percentage */}
          <BarContainer>
            <BarFill used={(ramUsed / ramTotal) * 100} color={
              (ramUsed / ramTotal) * 100 > 80 ? "#FF007F" :  // Red (Critical)
              (ramUsed / ramTotal) * 100 > 50 ? "#FFD700" :  // Yellow (Warning)
              "#00FF00" // Green (Safe)
            } />
          </BarContainer>

          <StatItem>
            <span style={{ color: "#FF007F" }}>Used: {ramUsed} GB</span> | 
            <span style={{ color: "#00FFCC" }}> Free: {ramAvailable} GB</span>
          </StatItem>
        </RamContainerCard>
      </StatsContainer>

      {/* SSD Section */}
      <StatsContainer>
        <Title>Drives:</Title>
        <DrivesContainerCard>
          {stats?.drives.map((drive, index) => (
            <>
            <DrivesInnerCard key={index}>
              {/* SSD Image */}
              <ImageContainer>
                <img src={ramSSDImage} alt="SSD" />
              </ImageContainer>
              <DrivesVolumeCard>
                {/* SSD Partitions */}
                {drive.partitions.map((partition, pIndex) => {
                  const usedPercentage = (parseFloat(partition.used) / parseFloat(partition.total)) * 100;

                  // Determine color based on usage percentage
                  let barColor = "#00FF00"; // Green (Safe)
                  if (usedPercentage > 50) barColor = "#FFD700"; // Yellow (Warning)
                  if (usedPercentage > 80) barColor = "red"; // Red (Critical)

                  return (
                    <div key={pIndex}>
                      <StatItem><strong>{partition.name}:</strong> {partition.total}</StatItem>

                      {/* SSD Horizontal Bar Graph (Single Bar) */}
                      <BarContainer>
                        <BarFill used={usedPercentage} color={barColor} />
                      </BarContainer>

                      <StatItem>
                        <span style={{ color: "#FF007F" }}>Used: {partition.used} </span> | 
                        <span style={{ color: "#00FFCC" }}> Free: {partition.free}</span>
                      </StatItem>
                    </div>
                  );
                })}
              </DrivesVolumeCard>
              
            </DrivesInnerCard>
            <DrivesGaugeCard layout={layout}>
              {/* SSD Temperature Gauge */}
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
                    value={parseFloat(drive.temperature)}
                  />
                  {/* <Chart
                    width={"100%"}
                    height={"220px"}
                    chartType="Gauge"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Label", "Value"],
                      ["Temp", parseFloat(drive.temperature) || 0],
                    ]}
                    options={{
                      redFrom: 50,
                      redTo: 80,
                      yellowFrom: 35,
                      yellowTo: 50,
                      minorTicks: 5,
                      max: 80,
                    }}
                  /> */}
                {/* SSD Read & Write Speed */}
                {/* <Chart
                  width={"100%"}
                  height={"220px"}
                  chartType="Gauge"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Label", "Value"],
                    ["Read", parseFloat(drive.read_speed) || 0],
                    ["Write", parseFloat(drive.write_speed) || 0],
                  ]}
                  options={{
                    redFrom: 500,
                    redTo: 1000,
                    yellowFrom: 200,
                    yellowTo: 500,
                    minorTicks: 5,
                    max: 1000,
                  }}
                /> */}
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
                    value={convertSpeedToKbps(drive.read_speed)} // Convert received speed to KB/s
                    maxValue={100000} // Adjusted to 100 MB/s
                  />
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
                    value={convertSpeedToKbps(drive.write_speed)} // Convert received speed to KB/s
                    maxValue={100000} // Adjusted to 100 MB/s
                  />
          </DrivesGaugeCard>
          </>
          ))}
         
        </DrivesContainerCard>
      </StatsContainer>
    </RamCard>
  );
};

/* Styled Components */
const RamCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #141a2a;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
`;
const SsdGaugeContainer = styled.div`
  display:flex;

`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  color: #fff;
`;

const ImageContainer = styled.div`
  width: 40%;
  img {
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "50%")};
    height: auto;
  }
`;

const RamContainerCard = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 10px;
`;
const DrivesContainerCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction:column;
`;

const DrivesInnerCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
`;
const DrivesGaugeCard = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "100%")};
    flex-direction: ${({ layout }) => (layout === "landscape" ? "row" : "column")};

  display:flex;

`;
const DrivesVolumeCard = styled.div`
  width : 60%;

`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatItem = styled.div`
  font-size: 14px;
  color: #00ffcc;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 15px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px 0;
`;

const BarFill = styled.div`
  width: ${(props) => props.used}%;
  height: 100%;
  background: ${(props) => props.color}; // Dynamic Color
  transition: width 0.5s ease-in-out;
`;

export default RAMSSD;
