import React from "react";
import styled from "styled-components";
import { Card, StatItem } from "../styles";

const FPSCounter = ({ stats, layout }) => {
  
  return (
    <Card >
      <h2>FPS Counter</h2>
      <StatItem>
        <strong>Current FPS:</strong> {stats.fps || "0"}
      </StatItem>
      <StatItem>
        <strong>Refresh Rate:</strong> {stats.refresh_rate || "60"} Hz
      </StatItem>
    </Card>
  );
};



export default FPSCounter;
