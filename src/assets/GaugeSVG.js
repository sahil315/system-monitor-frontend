import React from "react";
import styled from "styled-components";

const GaugeSVG = ({ usage }) => {
   // Ensure usage stays between 0-100
  const fillPercentage = Math.min(Math.max(20, 0), 100);
  console.log('fillPercentage.toFixed(1)' + fillPercentage.toFixed(1))
    return (
      <>
      <SVGContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 25.944 100 48.376">
         
            <defs>
                <clipPath id="gpuClip">
                    <rect
                        x={135 - (fillPercentage * 1.35)} // Adjust fill dynamically
                        y="0" // Adjust fill dynamically
                        width="110"
                        height="235"
                        fill="white"
                    />
                </clipPath>
            </defs>
            {/* CPU Shape with Stroke */}

    
            {/* Filled CPU Shape (Uses Clip Path) */}
            <g className="fan" style={{ transformOrigin: "23.2px 48.8px" }}>
          <path
            fill="#ff007f"
            d="M33.42,41.05c-0.39-0.53-0.82-1.03-1.29-1.5c-2.42-2.42-5.63-3.75-9.05-3.75s-6.63,1.33-9.05,3.75  c-0.15,0.15-0.3,0.31-0.45,0.47c-0.02,0.02-0.04,0.04-0.05,0.06c-1.99,2.23-3.13,5.04-3.23,8.04c0,0.03,0,0.06,0,0.1  c0,0.13-0.01,0.25-0.01,0.38c0,3.42,1.33,6.63,3.75,9.05s5.63,3.75,9.05,3.75c0.45,0,0.89-0.02,1.33-0.07c0.03,0,0.05,0,0.08-0.01  c2.89-0.31,5.56-1.59,7.65-3.67c0.04-0.04,0.08-0.09,0.13-0.13c0.03-0.03,0.06-0.06,0.09-0.09c2.07-2.17,3.29-4.94,3.5-7.91  c0.01-0.04,0.01-0.07,0.01-0.11c0.02-0.27,0.03-0.54,0.03-0.81c0-2.74-0.86-5.35-2.44-7.52C33.43,41.07,33.43,41.06,33.42,41.05z   M32.17,41.62c-0.58,2.82-1.92,4.72-4.07,5.79c-0.07-0.27-0.15-0.54-0.26-0.8c1.33-1.76,2.1-4.13,2.28-7.06  C30.89,40.15,31.58,40.85,32.17,41.62z M28.83,38.68c-0.06,2.36-0.48,4.33-1.28,5.9c0.8-2.1,0.71-4.33-0.26-6.64  C27.82,38.14,28.33,38.39,28.83,38.68z M26.91,48.4c0,0.07,0,0.13,0,0.2c0,1.81-1.26,3.33-2.95,3.73c-0.01,0-0.02,0-0.03,0.01  c-0.27,0.06-0.56,0.1-0.85,0.1c-1.58,0-2.93-0.96-3.52-2.32c0,0,0-0.01-0.01-0.01c-0.2-0.46-0.3-0.96-0.3-1.49  c0-0.38,0.06-0.75,0.16-1.1c0-0.01,0-0.02,0.01-0.02c0.48-1.56,1.94-2.7,3.66-2.7c0.16,0,0.31,0.01,0.47,0.03c0.01,0,0.01,0,0.02,0  c1.81,0.23,3.24,1.73,3.34,3.59C26.9,48.39,26.91,48.4,26.91,48.4z M23.08,37.13c0.85,0,1.68,0.09,2.48,0.27  c1.37,2.54,1.57,4.86,0.6,7.06c-0.22-0.17-0.46-0.31-0.71-0.44c-0.11-2.21-1.05-4.52-2.8-6.88C22.8,37.13,22.94,37.13,23.08,37.13z   M21.1,37.3c1.48,1.85,2.42,3.64,2.81,5.35c-0.74-2.13-2.24-3.78-4.48-4.93C19.98,37.54,20.53,37.4,21.1,37.3z M17.78,38.43  c2.68,1.06,4.32,2.71,4.99,5.02c-0.28,0.02-0.56,0.06-0.83,0.12c-1.51-1.62-3.71-2.78-6.55-3.47  C16.11,39.45,16.92,38.88,17.78,38.43z M14.31,41.22c2.32,0.47,4.19,1.23,5.59,2.29c-1.93-1.15-4.14-1.45-6.59-0.9  C13.61,42.12,13.94,41.65,14.31,41.22z M12.48,44.22c2.74-0.91,5.06-0.7,7.06,0.63c-0.2,0.19-0.39,0.4-0.56,0.62  c-2.2-0.27-4.63,0.25-7.26,1.56C11.86,46.05,12.12,45.1,12.48,44.22z M11.61,48.6c0,0,0-0.01,0-0.01c2.08-1.13,4-1.75,5.76-1.84  c-2.22,0.36-4.11,1.55-5.63,3.55C11.66,49.74,11.61,49.18,11.61,48.6z M13.37,54.7c-0.52-0.82-0.93-1.7-1.23-2.64  c1.51-2.46,3.42-3.79,5.81-4.05c-0.02,0.2-0.03,0.39-0.03,0.59c0,0.08,0,0.16,0.01,0.24C16.07,50.04,14.54,52.01,13.37,54.7z   M14.29,55.95c0.86-2.2,1.94-3.91,3.22-5.11c-1.47,1.7-2.15,3.82-2.03,6.33C15.06,56.8,14.66,56.39,14.29,55.95z M16.92,58.27  c-0.42-2.85,0.19-5.1,1.85-6.83c0.15,0.23,0.33,0.45,0.52,0.66c-0.65,2.12-0.56,4.61,0.27,7.42C18.63,59.21,17.74,58.79,16.92,58.27  z M21.08,59.89c-0.75-2.24-1.03-4.24-0.82-5.98c-0.03,2.25,0.81,4.31,2.52,6.15C22.2,60.05,21.63,59.99,21.08,59.89z M24.59,59.97  c-2.16-1.92-3.14-4.03-2.98-6.43c0.26,0.08,0.54,0.14,0.82,0.17c0.86,2.04,2.53,3.88,4.98,5.5C26.51,59.58,25.57,59.84,24.59,59.97z   M28.8,58.53c-2.02-1.23-3.51-2.59-4.47-4.06c1.42,1.74,3.39,2.78,5.88,3.1C29.77,57.93,29.3,58.25,28.8,58.53z M31.53,56.34  c-2.88-0.08-4.99-1.07-6.4-3.01c0.26-0.11,0.5-0.24,0.74-0.39c1.49,0.76,3.25,1.14,5.28,1.14c0.66,0,1.35-0.04,2.07-0.12  C32.76,54.82,32.19,55.62,31.53,56.34z M33.85,52.53c-2.33,0.35-4.35,0.28-6.03-0.24c0.52,0.1,1.04,0.15,1.56,0.15  c1.68,0,3.33-0.52,4.94-1.56C34.21,51.45,34.05,52,33.85,52.53z M34.55,48.6c0,0.17,0,0.33-0.01,0.49  c-2.26,1.79-4.51,2.39-6.85,1.82c0.12-0.25,0.23-0.51,0.31-0.78c2.16-0.5,4.26-1.82,6.29-3.95C34.46,46.96,34.55,47.77,34.55,48.6z   M29.08,48.39c1.97-1.1,3.33-2.86,4.07-5.26c0.27,0.5,0.51,1.02,0.7,1.56C32.3,46.46,30.7,47.7,29.08,48.39z"
          />
        </g>

        {/* Second Fan */}
        <g className="fan" style={{ transformOrigin: "49.9px 48.5px" }}>
          <path
            fill="#ff007f"
            d="M60.34,41.05c-0.39-0.53-0.82-1.03-1.29-1.5c-2.42-2.42-5.63-3.75-9.05-3.75s-6.63,1.33-9.05,3.75  c-0.15,0.15-0.3,0.31-0.45,0.47c-0.02,0.02-0.04,0.04-0.05,0.06c-1.99,2.23-3.13,5.04-3.23,8.04c0,0.03,0,0.06,0,0.1  c0,0.13-0.01,0.25-0.01,0.38c0,3.42,1.33,6.63,3.75,9.05S46.58,61.4,50,61.4c0.45,0,0.89-0.02,1.33-0.07c0.03,0,0.05,0,0.08-0.01  c2.89-0.31,5.56-1.59,7.65-3.67c0.04-0.04,0.08-0.09,0.13-0.13c0.03-0.03,0.06-0.06,0.09-0.09c2.07-2.17,3.29-4.94,3.5-7.91  c0.01-0.04,0.01-0.07,0.01-0.11c0.02-0.27,0.03-0.54,0.03-0.81c0-2.74-0.86-5.35-2.44-7.52C60.35,41.07,60.34,41.06,60.34,41.05z   M59.09,41.62c-0.58,2.82-1.92,4.72-4.07,5.79c-0.07-0.27-0.15-0.54-0.26-0.8c1.33-1.76,2.1-4.13,2.28-7.06  C57.81,40.15,58.5,40.85,59.09,41.62z M55.74,38.68c-0.06,2.36-0.48,4.33-1.28,5.9c0.8-2.1,0.71-4.33-0.26-6.64  C54.74,38.14,55.25,38.39,55.74,38.68z M53.82,48.4c0,0.06,0.01,0.13,0.01,0.2c0,1.81-1.26,3.33-2.95,3.73c-0.01,0-0.02,0-0.03,0.01  c-0.27,0.06-0.56,0.1-0.85,0.1c-1.58,0-2.93-0.96-3.52-2.32c0,0,0-0.01-0.01-0.01c-0.2-0.46-0.3-0.96-0.3-1.49  c0-0.38,0.06-0.75,0.16-1.1c0-0.01,0-0.02,0.01-0.02c0.48-1.56,1.94-2.7,3.66-2.7c0.16,0,0.31,0.01,0.47,0.03c0.01,0,0.01,0,0.02,0  c1.81,0.23,3.24,1.73,3.34,3.58C53.82,48.39,53.82,48.4,53.82,48.4z M50,37.13c0.85,0,1.68,0.09,2.48,0.27  c1.37,2.54,1.57,4.86,0.6,7.06c-0.22-0.17-0.46-0.32-0.71-0.44c-0.11-2.21-1.05-4.52-2.8-6.88C49.71,37.13,49.86,37.13,50,37.13z   M48.02,37.3c1.48,1.85,2.42,3.64,2.81,5.35c-0.74-2.13-2.24-3.78-4.48-4.93C46.9,37.54,47.45,37.4,48.02,37.3z M44.7,38.43  c2.68,1.06,4.32,2.71,4.99,5.02c-0.28,0.02-0.56,0.06-0.83,0.12c-1.51-1.62-3.71-2.78-6.55-3.47C43.03,39.45,43.83,38.88,44.7,38.43  z M41.23,41.22c2.32,0.47,4.19,1.23,5.59,2.29c-1.93-1.15-4.14-1.45-6.59-0.9C40.53,42.12,40.86,41.65,41.23,41.22z M39.4,44.22  c2.74-0.91,5.06-0.7,7.06,0.63c-0.2,0.19-0.39,0.4-0.56,0.62c-2.2-0.27-4.63,0.25-7.26,1.56C38.77,46.05,39.03,45.1,39.4,44.22z   M38.53,48.6c0,0,0-0.01,0-0.01c2.08-1.13,4-1.75,5.76-1.84c-2.22,0.36-4.11,1.55-5.63,3.55C38.58,49.74,38.53,49.18,38.53,48.6z   M40.29,54.7c-0.52-0.82-0.93-1.7-1.23-2.64c1.51-2.46,3.42-3.79,5.81-4.05c-0.02,0.2-0.03,0.39-0.03,0.59c0,0.08,0,0.16,0.01,0.24  C42.99,50.04,41.46,52.01,40.29,54.7z M41.21,55.95c0.86-2.2,1.94-3.91,3.22-5.11c-1.47,1.7-2.15,3.82-2.03,6.33  C41.98,56.8,41.58,56.39,41.21,55.95z M43.84,58.27c-0.42-2.85,0.19-5.1,1.85-6.83c0.15,0.23,0.33,0.45,0.52,0.66  c-0.65,2.12-0.56,4.61,0.27,7.42C45.55,59.21,44.66,58.79,43.84,58.27z M48,59.89c-0.75-2.24-1.03-4.24-0.82-5.98  c-0.03,2.25,0.81,4.31,2.52,6.15C49.12,60.05,48.55,59.99,48,59.89z M51.5,59.97c-2.16-1.92-3.14-4.03-2.98-6.43  c0.26,0.08,0.54,0.14,0.82,0.17c0.86,2.04,2.53,3.88,4.98,5.5C53.43,59.58,52.49,59.84,51.5,59.97z M55.72,58.53  c-2.02-1.23-3.51-2.59-4.47-4.06c1.42,1.74,3.39,2.78,5.88,3.1C56.69,57.93,56.22,58.25,55.72,58.53z M58.45,56.34  c-2.88-0.08-4.99-1.07-6.4-3.01c0.26-0.11,0.5-0.24,0.74-0.39c1.49,0.76,3.25,1.14,5.28,1.14c0.66,0,1.35-0.04,2.07-0.12  C59.68,54.82,59.11,55.62,58.45,56.34z M60.77,52.53c-2.33,0.35-4.35,0.28-6.03-0.24c0.52,0.1,1.04,0.15,1.56,0.15  c1.68,0,3.33-0.52,4.94-1.56C61.12,51.45,60.97,52,60.77,52.53z M61.47,48.6c0,0.17,0,0.33-0.01,0.49  c-2.26,1.79-4.51,2.39-6.85,1.82c0.12-0.25,0.23-0.51,0.31-0.78c2.16-0.5,4.26-1.82,6.29-3.95C61.38,46.96,61.47,47.77,61.47,48.6z   M56,48.39c1.97-1.1,3.33-2.86,4.07-5.26c0.27,0.5,0.51,1.02,0.7,1.56C59.22,46.46,57.62,47.7,56,48.39z"
          />
        </g>

        {/* Third Fan */}
        <g className="fan" style={{ transformOrigin: "76.7px 48.8px" }}>
          <path
            fill="#ff007f"
            d="M87.26,41.05c-0.39-0.53-0.82-1.03-1.29-1.5c-2.42-2.42-5.63-3.75-9.05-3.75s-6.63,1.33-9.05,3.75  c-0.15,0.15-0.3,0.31-0.45,0.47c-0.02,0.02-0.04,0.04-0.05,0.06c-1.99,2.23-3.13,5.04-3.24,8.04c0,0.03,0,0.06,0,0.1  c0,0.13-0.01,0.25-0.01,0.38c0,3.42,1.33,6.63,3.75,9.05s5.63,3.75,9.05,3.75c0.45,0,0.89-0.02,1.33-0.07c0.03,0,0.05,0,0.08-0.01  c2.89-0.31,5.56-1.59,7.65-3.67c0.04-0.04,0.08-0.09,0.13-0.13c0.03-0.03,0.06-0.06,0.09-0.09c2.07-2.17,3.29-4.94,3.5-7.91  c0.01-0.04,0.01-0.07,0.01-0.11c0.02-0.27,0.03-0.54,0.03-0.81c0-2.74-0.86-5.35-2.44-7.52C87.27,41.07,87.26,41.06,87.26,41.05z   M86.01,41.62c-0.58,2.82-1.92,4.72-4.07,5.79c-0.07-0.27-0.15-0.54-0.26-0.8c1.33-1.76,2.1-4.13,2.28-7.06  C84.73,40.15,85.42,40.85,86.01,41.62z M82.66,38.68c-0.06,2.36-0.48,4.33-1.28,5.9c0.8-2.1,0.71-4.33-0.26-6.64  C81.66,38.14,82.17,38.39,82.66,38.68z M80.74,48.4c0,0.06,0.01,0.13,0.01,0.2c0,1.81-1.26,3.33-2.95,3.73c-0.01,0-0.02,0-0.03,0.01  c-0.27,0.06-0.56,0.1-0.85,0.1c-1.58,0-2.93-0.96-3.52-2.32c0,0,0-0.01,0-0.01c-0.2-0.46-0.3-0.97-0.3-1.5  c0-0.38,0.06-0.75,0.16-1.1c0-0.01,0-0.02,0.01-0.02c0.48-1.56,1.94-2.7,3.66-2.7c0.16,0,0.31,0.01,0.47,0.03c0.01,0,0.01,0,0.02,0  c1.81,0.23,3.24,1.73,3.34,3.58C80.74,48.39,80.74,48.4,80.74,48.4z M76.92,37.13c0.85,0,1.68,0.09,2.48,0.27  c1.37,2.54,1.57,4.86,0.6,7.06c-0.22-0.17-0.46-0.32-0.71-0.44c-0.11-2.21-1.05-4.52-2.8-6.88C76.63,37.13,76.78,37.13,76.92,37.13z   M74.94,37.3c1.48,1.85,2.42,3.64,2.81,5.35c-0.74-2.13-2.24-3.78-4.48-4.93C73.81,37.54,74.37,37.4,74.94,37.3z M71.62,38.43  c2.68,1.06,4.32,2.71,4.99,5.02c-0.28,0.02-0.56,0.06-0.83,0.12c-1.51-1.62-3.71-2.78-6.55-3.47  C69.95,39.45,70.75,38.88,71.62,38.43z M68.15,41.22c2.32,0.47,4.19,1.23,5.59,2.29c-1.93-1.15-4.14-1.45-6.59-0.9  C67.44,42.12,67.78,41.65,68.15,41.22z M66.32,44.22c2.74-0.91,5.06-0.7,7.06,0.63c-0.2,0.19-0.39,0.4-0.56,0.62  c-2.2-0.27-4.63,0.25-7.26,1.56C65.69,46.05,65.95,45.1,66.32,44.22z M65.45,48.6c0,0,0-0.01,0-0.01c2.08-1.13,4-1.75,5.76-1.84  c-2.22,0.36-4.11,1.55-5.63,3.55C65.49,49.74,65.45,49.18,65.45,48.6z M67.21,54.7c-0.52-0.82-0.93-1.7-1.23-2.64  c1.51-2.46,3.42-3.79,5.81-4.05c-0.02,0.2-0.03,0.39-0.03,0.59c0,0.08,0,0.16,0.01,0.24C69.91,50.04,68.38,52.01,67.21,54.7z   M68.13,55.95c0.86-2.2,1.94-3.91,3.22-5.11c-1.47,1.7-2.15,3.82-2.03,6.33C68.89,56.8,68.5,56.39,68.13,55.95z M70.76,58.27  c-0.42-2.85,0.19-5.1,1.85-6.83c0.15,0.23,0.33,0.45,0.52,0.66c-0.65,2.12-0.56,4.61,0.27,7.42C72.46,59.21,71.58,58.79,70.76,58.27  z M74.92,59.89c-0.75-2.24-1.03-4.24-0.82-5.98c-0.03,2.25,0.81,4.31,2.52,6.15C76.04,60.05,75.47,59.99,74.92,59.89z M78.42,59.97  c-2.16-1.92-3.14-4.03-2.98-6.43c0.26,0.08,0.54,0.14,0.82,0.17c0.86,2.04,2.53,3.88,4.98,5.5C80.35,59.58,79.41,59.84,78.42,59.97z   M82.64,58.53c-2.02-1.23-3.51-2.59-4.47-4.06c1.42,1.74,3.39,2.78,5.88,3.1C83.61,57.93,83.14,58.25,82.64,58.53z M85.37,56.34  c-2.88-0.08-4.99-1.07-6.4-3.01c0.26-0.11,0.5-0.24,0.74-0.39c1.49,0.76,3.25,1.14,5.28,1.14c0.66,0,1.35-0.04,2.07-0.12  C86.6,54.82,86.03,55.62,85.37,56.34z M87.69,52.53c-2.33,0.35-4.35,0.28-6.03-0.24c0.52,0.1,1.04,0.15,1.56,0.15  c1.68,0,3.33-0.52,4.94-1.56C88.04,51.45,87.89,52,87.69,52.53z M88.39,48.6c0,0.17,0,0.33-0.01,0.49  c-2.26,1.79-4.51,2.39-6.85,1.82c0.12-0.25,0.23-0.51,0.31-0.78c2.16-0.5,4.26-1.82,6.29-3.95C88.3,46.96,88.39,47.77,88.39,48.6z   M82.92,48.39c1.97-1.1,3.33-2.86,4.07-5.26c0.27,0.5,0.51,1.02,0.7,1.56C86.14,46.46,84.54,47.7,82.92,48.39z" 
          />
        </g>
           <path fill="#ff007f"   d="M87.79,31.43H64.42c-0.01,0-0.01,0-0.02,0c-0.01,0-0.03,0-0.04,0c-0.01,0-0.02,0-0.03,0c-0.01,0-0.02,0-0.04,0.01  c-0.01,0-0.02,0-0.03,0.01c-0.01,0-0.02,0.01-0.03,0.01c-0.01,0-0.02,0.01-0.03,0.01c-0.01,0-0.02,0.01-0.03,0.01  c-0.01,0-0.02,0.01-0.03,0.01c-0.01,0-0.02,0.01-0.03,0.01c-0.01,0.01-0.02,0.01-0.03,0.02c-0.01,0-0.02,0.01-0.02,0.01  c-0.01,0.01-0.02,0.02-0.04,0.03c-0.01,0-0.01,0.01-0.02,0.01l-2.24,1.82H38.25L36,31.58c-0.01,0-0.01-0.01-0.02-0.01  c-0.01-0.01-0.02-0.02-0.04-0.03c-0.01-0.01-0.02-0.01-0.02-0.01c-0.01-0.01-0.02-0.01-0.03-0.02c-0.01,0-0.02-0.01-0.03-0.01  c-0.01,0-0.02-0.01-0.03-0.01c-0.01,0-0.02-0.01-0.03-0.01c-0.01,0-0.02-0.01-0.03-0.01c-0.01,0-0.02-0.01-0.03-0.01  c-0.01,0-0.02-0.01-0.03-0.01c-0.01,0-0.02,0-0.04-0.01c-0.01,0-0.02,0-0.03,0c-0.01,0-0.03,0-0.04,0c-0.01,0-0.01,0-0.02,0H12.21  c-2.6,0-4.71,2.11-4.71,4.71v25.04c0,2.33,1.7,4.27,3.93,4.64v2.09c0,0.37,0.3,0.66,0.66,0.66H25.8c0.37,0,0.66-0.3,0.66-0.66v-2.03  h1.67v2.03c0,0.37,0.3,0.66,0.66,0.66h5.12c0.37,0,0.66-0.3,0.66-0.66v-2.03h0.99c0,0,0,0,0,0h0c0.01,0,0.01,0,0.02,0  c0.02,0,0.03,0,0.05,0c0.01,0,0.02,0,0.03,0c0.01,0,0.03,0,0.04-0.01c0.01,0,0.02,0,0.03-0.01c0.01,0,0.02-0.01,0.03-0.01  c0.01,0,0.02-0.01,0.03-0.01c0.01,0,0.02-0.01,0.03-0.01c0.01,0,0.02-0.01,0.03-0.01c0.01,0,0.02-0.01,0.03-0.01  c0.01-0.01,0.02-0.01,0.03-0.02c0.01,0,0.02-0.01,0.02-0.01c0.01-0.01,0.02-0.02,0.04-0.03c0.01,0,0.01-0.01,0.02-0.01l2.24-1.82  h23.51L64,65.73c0.01,0.01,0.03,0.02,0.05,0.03c0,0,0,0,0.01,0c0.02,0.01,0.03,0.02,0.05,0.03c0.01,0,0.01,0.01,0.02,0.01  c0.01,0.01,0.02,0.01,0.04,0.02c0.01,0,0.01,0.01,0.02,0.01c0.01,0,0.02,0.01,0.04,0.01c0.01,0,0.02,0,0.02,0.01  c0.01,0,0.02,0.01,0.04,0.01c0.01,0,0.02,0,0.02,0c0.01,0,0.03,0,0.04,0.01c0.01,0,0.01,0,0.02,0c0.02,0,0.04,0,0.06,0c0,0,0,0,0,0  h23.37c2.6,0,4.71-2.11,4.71-4.71V36.14C92.5,33.54,90.39,31.43,87.79,31.43z M25.14,67.24H12.76v-1.36h12.38V67.24z M33.25,67.24  h-3.79v-1.36h3.79V67.24z M91.17,61.17c0,1.86-1.52,3.38-3.38,3.38H64.65l-2.24-1.82c-0.12-0.1-0.27-0.15-0.42-0.15H38.01  c-0.15,0-0.3,0.05-0.42,0.15l-2.24,1.82h-1.43H28.8h-3H12.21c-1.86,0-3.38-1.52-3.38-3.38V36.14c0-1.86,1.52-3.38,3.38-3.38h23.14  l2.24,1.82c0.12,0.1,0.27,0.15,0.42,0.15h23.98c0.15,0,0.3-0.05,0.42-0.15l2.24-1.82h23.14c1.86,0,3.38,1.52,3.38,3.38V61.17z" />
        
        </svg>
  
        {/* CPU Usage Text */}
        
      </SVGContainer>
      </>
    );
  };
  
  const SVGContainer = styled.div`
//  width: ${({ layout }) => (layout === "landscape" ? "200px" : "50%")};
    
    min-width: 400px;
    height: 200px;
    // object-fit: contain;
    min-height: 200px;
//   display: flex;
//   align-items: center;
  transform: rotate(90deg);
//   justify-content: center;

  /* Animation */
  .fan {
    animation: rotateFan 1s linear infinite;
  }

  @keyframes rotateFan {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
  
  const UsageText = styled.div`
    position: absolute;
    color: #ff007f;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    display: flex;
    width: 250px;
    justify-content: center;
        justify-content: center;
      align-content: flex-start;
      align-items: flex-start;
  `;
  

export default GaugeSVG;
