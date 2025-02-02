import React, { useState, useEffect } from "react";
import { AppContainer, DashboardContainer, TopBarStyle, ToggleButton, ContentContainer } from "./styles";
import CPU from "./components/CPU";
import GPU from "./components/GPU";
import RAMSSD from "./components/RAMSSD";
import Motherboard from "./components/Motherboard";
import TopBar from "./components/TopBar";

const App = () => {
  const [layout, setLayout] = useState("landscape");
  const [stats, setStats] = useState(null);
console.log('layout ' + layout)
  useEffect(() => {
    const updateLayout = () => {
      setLayout(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    };
    window.addEventListener("resize", updateLayout);
    updateLayout();
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    const eventSource = new EventSource("http://192.168.29.85:5000/stream");

    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        setStats(newData);
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  if (!stats) return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  return (
    <AppContainer>
      {/* Top Bar (Always Stays Outside Dashboard) */}
      <TopBarStyle>
        <TopBar  stats={stats} layout={layout} />
        <ToggleButton onClick={() => setLayout(layout === "landscape" ? "portrait" : "landscape")}>
          {layout === "landscape" ? "Portrait Mode" : "Landscape Mode"}
        </ToggleButton>
      </TopBarStyle>

      {/* Dashboard with Proper Content Structure */}
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
