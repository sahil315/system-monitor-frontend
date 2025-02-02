import styled from "styled-components";

// Full Page Container
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #121827;
`;

// Top Bar (Separate from Dashboard)
export const TopBarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 10px 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

// Toggle Button
export const ToggleButton = styled.button`
  background: #0080ff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #005bb5;
  }
`;

// Dashboard Section (Doesn't Include TopBar)
export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 20px;
`;

// **Content Grid (Fixed 2 Cards Per Row)**
export const ContentContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);

  // Smaller scaling for portrait mode
  ${({ layout }) =>
    layout === "portrait" &&
    `
      transform: scale(1); 
      transform-origin: center;
  `}
`;
export const StatsGrid = styled.div`
  display: grid;
  width: 100%;
  height: 80%;
  gap: 10px;
  grid-template-columns: ${({ layout }) => (layout === "landscape" ? "1fr 1fr" : "1fr")};
  grid-template-rows: ${({ layout }) => (layout === "landscape" ? "1fr 1fr" : "repeat(4, 1fr)")};
`;

export const ImageContainer = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "40%" : "40%")};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    max-width: 150px;
  }
`;
export const RamCard = styled.div`
  display: flex;
  flex-direction: ${({ layout }) => (layout === "landscape" ? "column" : "column")};
  align-items: center;
  justify-content: space-between;
  background: #1e1e1e;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ff007f;
  box-shadow: 0px 0px 10px rgba(255, 0, 127, 0.5);
  transition: all 0.3s ease-in-out;
`;

export const DrivesInnerCard = styled.div`
  display: flex;
    align-items: center;
  flex-wrap: wrap;
`;

export const DrivesContainerCard = styled.div`
   display: grid;
      width: 100%;
    height: 80%;
    gap: 10px;
    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  
`;

export const Card = styled.div`
  display: flex;
  flex-direction: ${({ layout }) => (layout === "landscape" ? "row" : "row")};
  align-items: center;
  justify-content: space-between;
  background: #1e1e1e;
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #ff007f;
  box-shadow: 0px 0px 10px rgba(255, 0, 127, 0.5);
  transition: all 0.3s ease-in-out;
`;
export const RamContainerCard = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "35%")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 10px;
`;

export const BoardContainerCard = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "35%")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 10px;
`;
export const StatsContainer = styled.div`
  width: ${({ layout }) => (layout === "landscape" ? "100%" : "35%")};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 10px;
`;

export const StatItem = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin: 5px 0;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.3);
`;

export const Title = styled.h3`
  font-size: 18px;
  color: #00FFFF;
  margin-bottom: 10px;
`;

// export const ToggleButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   background: #ff007f;
//   color: white;
//   border: none;
//   padding: 10px 15px;
//   cursor: pointer;
//   font-size: 16px;
//   border-radius: 5px;
//   transition: 0.3s;
//   &:hover {
//     background: #ff0050;
//   }
// `;
export const BarContainer = styled.div`
    width: ${({ layout }) => (layout === "landscape" ? "100%" : "35%")};
  height: 15px;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
`;

export const BarFill = styled.div`
  height: 100%;
  background-color: ${({ value }) =>
    value > 80 ? "#FF4500" : value > 50 ? "#FFD700" : "#00FF00"};
  width: ${({ value }) => value}%;
  transition: width 0.5s ease-in-out;
`;