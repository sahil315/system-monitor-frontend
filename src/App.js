import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppContainer, DashboardContainer, TopBarStyle, ToggleButton, ContentContainer } from "./styles";
import CPU from "./components/CPU";
import GPU from "./components/GPU";
import RAMSSD from "./components/RAMSSD";
import Motherboard from "./components/Motherboard";
import TopBar from "./components/TopBar";

const API_URL = process.env.REACT_APP_API_URL;  // Use env variables correctly in React
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [layout, setLayout] = useState("landscape");
  const [stats, setStats] = useState(null);
  const [socket, setSocket] = useState(null);

  console.log("Current Layout:", layout);
  console.log("API URL:", API_URL);
  console.log("API Key:", API_KEY);

  useEffect(() => {
    const updateLayout = () => {
      setLayout(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    };
    window.addEventListener("resize", updateLayout);
    updateLayout();
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // ✅ WebSocket Connection
  useEffect(() => {
    const ws = new WebSocket(`wss://api.pcstats.site`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected.");
      ws.send(JSON.stringify({ api_key: API_KEY })); // Send API key for authentication
    };

    ws.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        console.log("📡 Received WebSocket data:", newData);
        setStats(newData);
      } catch (error) {
        console.error("❌ Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.warn("⚠️ WebSocket closed. Reconnecting in 5s...", event.reason);
      setTimeout(() => setSocket(new WebSocket(`wss://api.pcstats.site`)), 5000);
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  if (!stats) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

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
