import React, { useState, useEffect, useRef, useCallback } from "react";
import { AppContainer, DashboardContainer, TopBarStyle, ToggleButton, ContentContainer } from "./styles";
import CPU from "./components/CPU";
import GPU from "./components/GPU";
import RAMSSD from "./components/RAMSSD";
import Motherboard from "./components/Motherboard";
import TopBar from "./components/TopBar";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [layout, setLayout] = useState(() => (window.innerWidth > window.innerHeight ? "landscape" : "portrait"));
  const [stats, setStats] = useState(null);
  const [socket, setSocket] = useState(null);
  const layoutRef = useRef(layout); // 🔥 Store layout in a ref to prevent unnecessary updates

  console.log("Current Layout:", layout);
  console.log("API URL:", API_URL);
  console.log("API Key:", API_KEY);

  // ✅ Fix ResizeObserver Loop (Throttle + Check for Actual Change)
  useEffect(() => {
    let resizeTimeout;

    const updateLayout = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newLayout = window.innerWidth > window.innerHeight ? "landscape" : "portrait";

        if (layoutRef.current !== newLayout) { // ✅ Only update if changed
          layoutRef.current = newLayout;
          setLayout(newLayout);
        }
      }, 200); // ✅ Throttle resize event
    };

    window.addEventListener("resize", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // ✅ Efficient WebSocket Connection for Real-time Updates
  useEffect(() => {
    let ws;

    const connectWebSocket = () => {
      ws = new WebSocket(`wss://api.pcstats.site`);

      ws.onopen = () => {
        console.log("✅ WebSocket connected.");
        ws.send(JSON.stringify({ api_key: API_KEY })); // Authenticate WebSocket
      };

      ws.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
          console.log("📡 Received WebSocket data:", newData);

          setStats(prevStats => ({
            ...prevStats,  // Keep old values
            ...newData     // Merge updated values
          }));
        } catch (error) {
          console.error("❌ Error parsing WebSocket data:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket error:", error);
      };

      ws.onclose = (event) => {
        console.warn("⚠️ WebSocket closed. Reconnecting in 5s...", event.reason);
        setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
      };

      setSocket(ws);
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
    };
  }, []);

  // ✅ Fix Scrollbar Overflow (Prevent Infinite Resizing)
  const toggleLayout = useCallback(() => {
    setLayout(prevLayout => {
      const newLayout = prevLayout === "landscape" ? "portrait" : "landscape";
      layoutRef.current = newLayout; // ✅ Update ref to prevent loop
      return newLayout;
    });
  }, []);

  if (!stats) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <AppContainer>
      <TopBarStyle>
        <TopBar stats={stats} layout={layout} />
        <ToggleButton onClick={toggleLayout}>
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
