import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import NetworkSpeedGraph from "./NetworkSpeedGraph";

const FPSMonitor = ({ }) => {
  const svgRef = useRef(null);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;

    const calculateFPS = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastFrameTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = now;
      }

      requestAnimationFrame(calculateFPS);
    };

    requestAnimationFrame(calculateFPS);

    return () => cancelAnimationFrame(calculateFPS);
  }, []);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove(); // Clear previous graph

//     const width = 90;
//     const height = 35;
//     const maxFPS = 144; // Adjust max FPS range for scaling

//     const xScale = d3.scaleLinear().domain([0, fpsHistory.length]).range([0, width]);
//     const yScale = d3.scaleLinear().domain([0, maxFPS]).range([height, 0]);

//     const line = d3.line()
//       .x((_, i) => xScale(i))
//       .y((d) => yScale(d))
//       .curve(d3.curveMonotoneX);

//     svg.append("path")
//       .datum(fpsHistory)
//       .attr("fill", "none")
//       .attr("stroke", "#ff007f")
//       .attr("stroke-width", 2)
//       .attr("d", line);
//   }, [fpsHistory]);

  return (
    <div className="relative w-[140px] h-[60px] bg-[#161b22] border-2 border-gray-500 rounded-lg flex justify-center items-center">
      <svg ref={svgRef} className="absolute left-0 top-0 w-full h-[40px]" />
      <NetworkSpeedGraph
            dataProp={{
              speed1: fps
            }} 
            type="network"
          />
    </div>
  );
};

export default FPSMonitor;
