import React from "react";
import styled from "styled-components";
import FPSStats from "react-fps-stats";

const MonitorUI = ({ fps = 0, resolution = "1920 x 1080", refreshRate = "144 Hz", audioLevel = 58 }) => {
  
  
  return (
    <>
    <MonitorContainer>
      <Details>
        {/* FPS Text */}
        <FpsText>
          <FPSStats top="20" left="280"  />
          {/* <span className="red">{fps}</span> <span className="cyan">FPS</span> */}
        </FpsText>

        {/* Resolution & Refresh Rate */}
        <ResolutionText>{`${resolution}`}</ResolutionText>
        <RefreshText>{`${refreshRate}`}</RefreshText>

        {/* Audio Level Bar */}
        <AudioContainer>
          <AudioBar>
            <AudioFill width={audioLevel} />
            <AudioLabel>Audio</AudioLabel>
            <AudioValue>{audioLevel}%</AudioValue>
          </AudioBar>
        </AudioContainer>
      </Details>
      {/* Monitor SVG */}
      <MonitorSVG viewBox="4.703 11.459 90.22 78.089">

        <path
          d="M 60.938 85.938 L 60.938 73.438 L 88.379 73.438 C 90.219 73.438 91.981 72.708 93.281 71.407 C 94.582 70.106 95.313 68.344 95.313 66.505 L 95.313 17.872 C 95.313 16.032 94.582 14.27 93.281 12.969 C 91.981 11.669 90.219 10.938 88.379 10.938 L 11.621 10.938 C 9.781 10.938 8.019 11.668 6.719 12.969 C 5.418 14.27 4.688 16.032 4.688 17.872 L 4.688 66.505 C 4.688 68.344 5.418 70.106 6.719 71.407 C 8.019 72.708 9.781 73.438 11.621 73.438 L 39.062 73.438 L 39.062 85.938 L 31.25 85.938 C 30.386 85.938 29.687 86.637 29.687 87.501 C 29.687 88.364 30.386 89.063 31.25 89.063 L 68.75 89.063 C 69.613 89.063 70.312 88.364 70.312 87.501 C 70.312 86.637 69.613 85.938 68.75 85.938 L 60.938 85.938 Z M 57.813 85.938 L 57.813 73.438 L 42.188 73.438 L 42.188 85.938 L 57.813 85.938 Z M 11.622 70.313 L 88.38 70.313 C 89.392 70.313 90.361 69.915 91.075 69.196 C 91.79 68.485 92.193 67.516 92.193 66.501 L 92.193 17.868 C 92.193 16.856 91.794 15.887 91.075 15.172 C 90.364 14.457 89.396 14.055 88.38 14.055 L 11.622 14.055 C 10.61 14.055 9.642 14.453 8.927 15.172 C 8.212 15.883 7.81 16.852 7.81 17.868 L 7.81 66.501 C 7.81 67.512 8.208 68.481 8.927 69.196 C 9.638 69.911 10.606 70.313 11.622 70.313 Z"
          fillRule="evenodd"
          stroke="#ff007f"
        />
      </MonitorSVG>
      
    </MonitorContainer>

    
  </>

  );
};

// Styled Components
const MonitorContainer = styled.div`
  position: relative;
  width: 250px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const MonitorSVG = styled.svg`
  width: 200px;
  height:200px;
  height: auto;
`;

const Details = styled.div`
  width: 180px;
  padding: 10px;
  height:110px;    
  position: absolute;
  display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    justify-content: space-around;

`;
const FpsText = styled.div`
   z-index: 999999;
    position: unset;
    /* height: 46px; */
    /* width: 76px; */
    padding: 3px;
    /* background-color: rgb(0, 0, 0); */
    /* color: rgb(0, 255, 255); */
    /* font-size: 9px; */
    line-height: 10px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
    pointer-events: none;
    inset: 0px auto auto 0px;
  .red {
    color: #ff007f;
  }

  .cyan {
    color: #00ffff;
  }
  
  & #fpsCounter{
    z-index: 999999;
    position: unset;
    /* height: 46px; */
    /* width: 76px; */
    padding: 3px;
    /* background-color: rgb(0, 0, 0); */
    /* color: rgb(0, 255, 255); */
    /* font-size: 9px; */
    line-height: 10px;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
    pointer-events: none;
    inset: 0px auto auto 0px;
  }
`;

const RefreshText = styled.div`
  font-size: 16px;
  color: #00ffff;
  font-weight: bold;
`;

const ResolutionText = styled.div`
  font-size: 22px;
  color: #ff007f;
  font-weight: bold;
`;

const AudioContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #333;
  background: #111;
  padding: 0px;
  margin: 0px 0px;
`;

const AudioBar = styled.div`
  width: 100%;
  height: 20px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0px;
  border: 1px solid #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  position: relative;
`;

const AudioLabel = styled.span`
  background: transparent;
  color: #333;
  padding: 0px 5px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  z-index:999;
`;

const AudioFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #00ffff;
  width: ${({ width }) => width}%;
  z-index: 0;
`;

const AudioValue = styled.span`
  position: relative;
  z-index: 1;
  padding: 0px 4px
`;

export default MonitorUI;
