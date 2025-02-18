import React from "react";
import styled from "styled-components";

const Partitions = ({ stats }) => {
  if (!stats || !stats.partitions) return null;
  console.log('part stats '  +JSON.stringify(stats.partitions))
  return (
    <PartitionContainer>
      {/* <Title>FREE SPACE</Title> */}
      {stats.partitions.map((partition, index) => (
        <Partition key={index}>
          <PartitionLabel>
            {partition.name}: <span>{getLabel(partition.name)}</span>{" "}
            <StorageValue>Free {partition.free} GB / {partition.total}</StorageValue>
          </PartitionLabel>
          <BarContainer>
            <BarFill used={parseFloat(partition.percentUsed)} />
          </BarContainer>
        </Partition>
      ))}
    </PartitionContainer>
  );
};

// ✅ Function to get partition labels
const getLabel = (name) => {
  switch (name) {
    case "C:":
      return "WINDOWS";
    case "D:":
      return "PERSONAL";
    case "F:":
      return "GAMES";
    default:
      return "DRIVE";
  }
};

/* ✅ Styled Components */
const PartitionContainer = styled.div`
  // background: #0f1722;
  padding: 15px;
  border-radius: 10px;
  font-family: "Orbitron", sans-serif;
  width: 100%
`;

const Title = styled.div`
  color: #ff004d;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
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

const StorageValue = styled.span`
  color: #00ffff;
  font-size: 14px;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 30px;
  background: #222f3e;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 5px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.5);
`;

const BarFill = styled.div`
  width: ${(props) => props.used}%;
  height: 100%;
  background: linear-gradient(90deg, #00ffff 0%, #ff004d 100%);
  transition: width 0.5s ease-in-out;
`;

export default Partitions;
