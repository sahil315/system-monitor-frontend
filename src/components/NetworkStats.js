import React from "react";
import styled from "styled-components";

const NetworkCard = styled.div`
  display: flex;
  background: #222;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const NetworkItem = styled.div`
  font-size: 16px;
  color: #00ffcc;
  margin-bottom: 5px;
`;

const Network = ({ stats }) => {
  const sent = stats?.network?.sent || "N/A";
  const received = stats?.network?.received || "N/A";
  const uploaded = stats?.network?.uploaded || "N/A";
  const downloaded = stats?.network?.downloaded || "N/A";
  const utilization = stats?.network?.utilization || "N/A";

  return (
    <NetworkCard>
      <StatsContainer>
        <NetworkItem><strong>Upload Speed:</strong> {sent}</NetworkItem>
        <NetworkItem><strong>Download Speed:</strong> {received}</NetworkItem>
        <NetworkItem><strong>Data Uploaded:</strong> {uploaded}</NetworkItem>
        <NetworkItem><strong>Data Downloaded:</strong> {downloaded}</NetworkItem>
        <NetworkItem><strong>Utilization:</strong> {utilization}</NetworkItem>
      </StatsContainer>
    </NetworkCard>
  );
};

export default Network;
