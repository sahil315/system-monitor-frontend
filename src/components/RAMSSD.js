import React from "react";
import { Chart } from "react-google-charts";
import styled from "styled-components";
import ramSSDImage from "../assets/noun-ssd.svg";
import ramImage from "../assets/ram.svg";
import { GaugeComponent } from 'react-gauge-component';
import CircularGauge from './CircularGauge';
import NetworkSpeedGraph from "./NetworkSpeedGraph";
import Partitions from './Partitions';
import { MainCard, SsdCard, ImageContainer, RamCard,  StatsContainer, StatItem } from "../styles";
import SSDUsageSVG from './../assets/SSDUsageSVG'
import RamUsageSVG from './../assets/RamUsageSVG'



const RAMSSD = ({ stats, layout }) => {
  if (!stats) return null;

  const ramLoad = parseFloat(stats?.ram?.load) || 0;
  const ramUsed = parseFloat(stats?.ram?.used) || 0;
  const ramAvailable = parseFloat(stats?.ram?.available) || 0;
  const ramTotal = ramUsed + ramAvailable;
  const VRamLoad = parseFloat(stats?.ram?.virtual_load) || 0;
  const VRamUsed = parseFloat(stats?.ram?.virtual_used) || 0;
  const VRamAvailable = parseFloat(stats?.ram?.virtual_available) || 0;
  const VRamTotal = VRamUsed + VRamAvailable;
  // //console.log('RAMS '  + JSON.stringify(stats?.ram))
  // {"load":"60.4 %","virtual_load":"63.5 %","used":"19.2 GB","available":"12.6 GB","virtual_used":"24.1 GB","virtual_available":"13.8 GB"}
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
  const getMaxSSDUsage = (partitions) => {
    if (!partitions || partitions.length === 0) return 0;
  
    // Filter only C: and D: partitions
    const ssdPartitions = partitions.filter(p => p.name === "C:" || p.name === "D:");
  
    // Calculate usage percentage for each partition
    const usagePercentages = ssdPartitions.map(p => (parseFloat(p.used) / parseFloat(p.total)) * 100);
  
    // Return the highest usage percentage
    return usagePercentages.length > 0 ? Math.max(...usagePercentages) : 0;
  };
  
  // Inside your component:
  const maxSSDUsage = getMaxSSDUsage(stats.partitions);

  //console.log('maxSSDUsage ' + Math.ceil(maxSSDUsage))

  return (
    <MainCard layout={layout}>
      <RamCard layout={layout}> 
        {/* RAM Section */}
        <ImageContainer>
            {/* <img className="Leftimage" src={ramImage} alt="RAM & SSD" /> */}

            <RamUsageSVG usage={20} />
            <StatItem className="ramName"><strong>G.Skill Intel XMP 32GB (2 x 16GB) DDR5 6000 MHz</strong></StatItem>
        </ImageContainer>
        
        <StatsContainer>
        {/* <Title>RAM & Storage</Title> */}
        
        <RamContainerCard>
          {/* RAM Image */}
          
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
            value={ramLoad}
          />

          {/* RAM Bar Graph (Total, Used, Free) */}
          

          {/* Calculate RAM Usage Percentage */}
          <RamBars className="rammbarss">
              <StatItem><strong>RAM:</strong> 31.8 GB</StatItem>
              <StatItem>
                <span style={{ color: "#FF007F" }}>Used: {ramUsed} GB</span> | 
                <span style={{ color: "#00FFCC" }}> Free: {ramAvailable} GB</span>
              </StatItem>
            <BarContainer>
              
              <BarFill used={(ramUsed / ramTotal) * 100} color={
                (ramUsed / ramTotal) * 100 > 80 ? "#FF007F" :  // Red (Critical)
                (ramUsed / ramTotal) * 100 > 50 ? "#FFD700" :  // Yellow (Warning)
                "#00ffff" // Green (Safe)
              } />
              
            </BarContainer>
              <StatItem><strong>Virtual RAM:</strong> 31.8 GB</StatItem>
                <StatItem>
                
                  <span style={{ color: "#FF007F" }}>Used: {VRamUsed} GB</span> | 
                  <span style={{ color: "#00FFCC" }}> Free: {VRamAvailable} GB</span>
                </StatItem>
            <BarContainer>
              
              <BarFill used={(VRamUsed / VRamTotal) * 100} color={
                (VRamUsed / VRamTotal) * 100 > 80 ? "#FF007F" :  // Red (Critical)
                (VRamUsed / VRamTotal) * 100 > 50 ? "#FFD700" :  // Yellow (Warning)
                "#00ffff" // Green (Safe)
              } />
              
            </BarContainer>
          </RamBars>
          
        </RamContainerCard>
        </StatsContainer>
      </RamCard>
      
      <SsdCard>
        {/* SSD Section */}
        <SsdImageContainer>
          {/* <img className="Leftimage" src={ramSSDImage} alt="SSD" /> */}
          <SSDUsageSVG usage={Math.ceil(maxSSDUsage)} />
        </SsdImageContainer>
        <StatsContainer>
          <DrivesContainerCard>
            {stats?.drives?.reduce((uniqueDrives, drive) => {
              if (!uniqueDrives.some(d => d.name === drive.name)) {
                uniqueDrives.push(drive);
              }
              return uniqueDrives;
            }, []).map((drive, index) => (
              <DrivesInnerCard key={index}>
                {/* Left - Circular Gauge (Takes 2 Rows) */}
                <LeftGaugeContainer>
                  <CircularGauge 
                    size={250} 
                    radius={100}
                    numSegments={50}
                    barWidth={5.5}
                    barGap={5}
                    percentage={parseFloat(drive.temperature)} 
                  />
                </LeftGaugeContainer>

                {/* Right - Top: Network Speed Graph, Bottom: Partitions */}
                <RightContainer>
                  {/* Top: Network Speed Graph */}
                  <TopGraphContainer>
                    {/* <NetworkSpeedGraph
                      dataProp={{
                        speed1: drive.write_speed, 
                        speed2: drive.read_speed
                      }} 
                      type="storage"
                    /> */}
                    <Partitions stats={stats} />
                    
                  </TopGraphContainer>

                  {/* Bottom: Partition Graph */}
                  <BottomGraphContainer>
                    <NetworkGrid>
                      <FanLabel style={{color: "#ff007f"}}>Write:</FanLabel>
                      <FanValue style={{color: "#ff007f"}}>{drive.write_speed} </FanValue>
                      <FanLabel style={{color: "#00ffff"}}>Read:</FanLabel>
                      <FanValue style={{color: "#00ffff"}}>{drive.read_speed} </FanValue>
                    </NetworkGrid>
                  </BottomGraphContainer>
                </RightContainer>
              </DrivesInnerCard>
            ))}
          </DrivesContainerCard>
        </StatsContainer>
      </SsdCard>

    </MainCard>
  );
};


const RamBars = styled.div`
  width:300px;
  height:100%;
`;

const SsdGaugeContainer = styled.div`
  display:flex;

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
  width: ${({ layout }) => (layout === "landscape" ? "60%" : "100%")};
    flex-direction: ${({ layout }) => (layout === "landscape" ? "row" : "column")};

  display:flex;

`;
const DrivesVolumeCard = styled.div`
  width : 100%;

`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const SsdImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
& .Leftimage{
  width: 400px;
  height: 300px;
}

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
const FanContainer = styled.div`
  display: flex;
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

const BarContainer = styled.div`
  width: 100%;
  height: 40px;
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


// Left side (Big Gauge)
const BigGaugeContainer = styled.div`
  flex: 1; /* Takes full height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Right side (Small Gauge + Bar Graph)

const LeftGaugeContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopGraphContainer = styled.div`
  width: 100%;
      min-width: 279px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomGraphContainer = styled.div`
    min-width: 279px;

width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PartitionContainer = styled.div`
  // background: #0f1722;
  padding: 15px;
  border-radius: 10px;
  font-family: "Orbitron", sans-serif;
`;


const Partition = styled.div`
  margin-bottom: 12px;
`;

const PartitionLabel = styled.div`
  color: #ff004d;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #00ffff;
  }
`;
export default RAMSSD;
