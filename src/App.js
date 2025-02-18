import React, { useState, useEffect } from "react";
import { AppContainer, DashboardContainer, TopBarStyle, ToggleButton, ContentContainer, LoadingContainer, StatusText } from "./styles";
import CPU from "./components/CPU";
import GPU from "./components/GPU";
import RAMSSD from "./components/RAMSSD";
import Motherboard from "./components/Motherboard";
import TopBar from "./components/TopBar";
import styled, { keyframes } from "styled-components";
import LoadingSpinner from "./assets/loading.svg";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

// 🔄 Rotating animation for loading
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 🔄 Styled Loading Indicator
// const LoadingSpinner = styled.div`
//   border: 5px solid rgba(255, 255, 255, 0.2);
//   border-top: 5px solid #ffffff;
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   animation: ${rotate} 1s linear infinite;
//   margin: auto;
// `;

const App = () => {
  const [layout, setLayout] = useState("landscape");
  const [stats, setStats] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const updateLayout = () => {
      setLayout(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    };
    window.addEventListener("resize", updateLayout);
    updateLayout();
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // ✅ WebSocket Connection with Reconnect & Status Handling
  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      setConnectionStatus("Connecting...");

      ws = new WebSocket(`wss://api.pcstats.site`);

      ws.onopen = () => {
        console.log("✅ WebSocket connected.");
        setConnectionStatus("Connected.");
        ws.send(JSON.stringify({ api_key: API_KEY })); // Send API key for authentication
      };

      ws.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          console.log("📡 Received WebSocket data:", newData);
          setStats((prevStats) => ({ ...prevStats, ...newData })); // Merge new values
        } catch (error) {
          console.error("❌ Error parsing WebSocket data:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
        setConnectionStatus("Error! Reconnecting...");
      };

      ws.onclose = (event) => {
        console.warn("⚠️ WebSocket closed. Reconnecting in 5s...", event.reason);
        setConnectionStatus("Reconnecting...");
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();
    setSocket(ws);
    return () => ws.close();
  }, []);

  console.log('stats43 ', JSON.stringify(stats))
  if (!stats) {
    return (
      <LoadingContainer>
        {/* <LoadingSpinner /> */}
        <img className="Leftimage" src={LoadingSpinner} alt="GPU" />
        <StatusText>{connectionStatus}</StatusText>
      </LoadingContainer>
    );
  }

  return (
    <AppContainer>
      <TopBarStyle>
        <TopBar stats={stats} layout={layout} />
        <ToggleButton onClick={() => setLayout(layout === "landscape" ? "portrait" : "landscape")}>
          {layout === "landscape" ? "Portrait Mode" : "Landscape Mode"}
        </ToggleButton>
      </TopBarStyle>

      <DashboardContainer>
        <ContentContainer layout={layout}>
          <Motherboard stats={stats} layout={layout} />
          <CPU stats={stats} layout={layout} />
          <RAMSSD stats={stats} layout={layout} />
          <GPU stats={stats} layout={layout} />
        </ContentContainer>
      </DashboardContainer>
    </AppContainer>
  );
};

export default App;
