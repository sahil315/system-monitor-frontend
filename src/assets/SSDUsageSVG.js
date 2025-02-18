import React from "react";
import styled from "styled-components";

const SSDUsageSVG = ({ usage }) => {
  // Ensure usage stays between 0-100
  const fillPercentage = Math.min(Math.max(usage, 0), 100);
  //console.log("SSD Fill Percentage:", fillPercentage.toFixed(1));

  return (
    <>
      <SVGContainer>
        <svg xmlns="http://www.w3.org/2000/svg" style={{height:"300px"}} version="1.1" viewBox="28.446 28.255 15.649 44.312">
          <defs>
            {/* Clip Path to control SSD fill dynamically */}
            <clipPath id="ssdClip">
              <rect
                x="28"
                y={74 - (fillPercentage * 0.44)} // Adjust based on percentage
                width="16"
                height="44"
                fill="white"
              />
            </clipPath>
          </defs>

          {/* SSD Outline */}
          <path
            d="M 38.183 29.934 L 38.19 32.501 C 38.19 32.598 38.229 32.691 38.299 32.759 C 38.367 32.828 38.462 32.864 38.561 32.864 L 38.562 32.864 C 38.661 32.864 38.756 32.825 38.826 32.759 C 38.893 32.691 38.933 32.597 38.933 32.5 L 38.926 29.934 L 42.273 29.929 L 42.281 33.226 L 43.025 33.226 L 43.121 71.689 L 37.172 71.699 L 37.169 70.601 C 37.169 70.196 36.835 69.87 36.426 69.87 C 36.014 69.871 35.681 70.2 35.682 70.603 L 35.685 71.703 L 29.736 71.712 L 29.64 33.246 L 30.383 33.246 L 30.375 29.949 L 38.184 29.936 L 38.183 29.934 Z M 30.453 61.452 L 30.477 70.976 L 33.824 70.971 L 33.822 70.603 C 33.821 69.924 34.093 69.272 34.58 68.791 C 35.067 68.311 35.728 68.041 36.417 68.038 L 36.419 68.038 C 37.11 68.038 37.771 68.304 38.259 68.785 C 38.472 68.995 38.646 69.236 38.773 69.5 L 42.372 69.493 L 42.366 67.295 L 32.699 67.31 L 32.685 61.449 L 30.453 61.452 Z M 34.565 70.97 L 34.938 70.97 L 34.938 70.602 C 34.935 69.793 35.6 69.137 36.422 69.137 C 37.243 69.134 37.91 69.788 37.912 70.598 L 37.912 70.965 L 38.285 70.964 L 38.285 70.597 C 38.283 70.112 38.086 69.646 37.738 69.304 C 37.388 68.961 36.916 68.769 36.422 68.77 L 36.42 68.77 C 35.927 68.77 35.455 68.965 35.108 69.307 C 34.759 69.65 34.565 70.117 34.567 70.602 L 34.568 70.97 L 34.565 70.97 Z M 39.028 70.964 L 42.375 70.957 L 42.373 70.225 L 39 70.232 C 39.017 70.352 39.027 70.474 39.027 70.597 L 39.028 70.964 Z M 42.364 66.562 L 42.283 33.958 L 40.05 33.962 L 40.049 33.228 L 41.537 33.226 L 41.534 32.127 L 39.674 32.131 L 39.675 32.495 C 39.676 32.789 39.559 33.068 39.351 33.272 C 39.143 33.479 38.858 33.595 38.565 33.595 L 38.562 33.595 C 38.266 33.595 37.983 33.482 37.775 33.275 C 37.565 33.07 37.448 32.79 37.447 32.5 L 37.445 32.132 L 31.124 32.142 L 31.129 33.975 L 30.386 33.977 L 30.405 40.936 L 31.519 40.935 L 31.509 36.899 C 31.507 36.609 31.625 36.332 31.833 36.125 C 32.041 35.92 32.323 35.802 32.617 35.802 L 40.063 35.791 C 40.357 35.791 40.639 35.906 40.849 36.11 C 41.058 36.317 41.176 36.594 41.176 36.884 L 41.251 66.562 L 42.365 66.559 L 42.364 66.562 Z M 41.534 31.395 L 41.532 30.662 L 40.973 30.664 L 40.975 31.396 L 41.534 31.395 Z M 40.231 30.664 L 39.672 30.667 L 39.675 31.399 L 40.233 31.396 L 40.231 30.664 Z M 30.406 41.671 L 30.454 60.721 L 32.685 60.717 L 32.682 59.985 L 33.426 59.985 L 33.443 66.58 L 40.506 66.569 L 40.435 37.993 L 32.254 38.004 L 32.265 42.401 L 31.522 42.403 L 31.52 41.671 L 30.406 41.673 L 30.406 41.671 Z M 37.444 31.403 L 37.442 30.672 L 36.884 30.672 L 36.886 31.404 L 37.444 31.403 Z M 36.141 30.673 L 35.398 30.673 L 35.401 31.405 L 36.143 31.404 L 36.141 30.673 Z M 34.653 30.676 L 33.91 30.677 L 33.911 31.408 L 34.656 31.408 L 34.653 30.676 Z M 33.167 30.677 L 32.423 30.679 L 32.426 31.409 L 33.168 31.409 L 33.167 30.677 Z M 31.68 30.679 L 31.121 30.681 L 31.122 31.411 L 31.682 31.411 L 31.68 30.679 Z M 40.432 37.261 L 40.432 36.891 C 40.432 36.795 40.393 36.704 40.323 36.636 C 40.255 36.568 40.161 36.53 40.064 36.53 L 32.619 36.542 C 32.523 36.542 32.429 36.582 32.36 36.648 C 32.292 36.717 32.254 36.808 32.254 36.903 L 32.254 37.274 L 40.435 37.261 L 40.432 37.261 Z M 34.101 33.242 L 34.104 33.975 L 31.871 33.979 L 31.87 33.245 L 34.101 33.242 Z M 40.881 68.033 L 40.884 68.765 L 39.024 68.768 L 39.022 68.037 L 40.881 68.033 Z M 32.707 70.244 L 31.963 70.247 L 31.96 68.78 L 32.702 68.78 L 32.707 70.244 Z M 39.692 38.729 L 39.758 65.837 L 34.183 65.846 L 34.115 38.736 L 39.692 38.729 Z M 34.86 39.468 L 34.924 65.113 L 39.012 65.104 L 38.949 39.463 L 34.86 39.468 Z M 38.208 40.195 L 38.21 40.927 L 35.607 40.931 L 35.606 40.199 L 38.208 40.195 Z M 35.61 42.032 L 36.355 42.031 L 36.41 64.378 L 35.666 64.378 L 35.61 42.032 Z"
            stroke="black" strokeWidth="0.5" fill="none" fillRule="evenodd"
          />

          {/* Filled SSD Section */}
          <path
            d="M 38.183 29.934 L 38.19 32.501 C 38.19 32.598 38.229 32.691 38.299 32.759 C 38.367 32.828 38.462 32.864 38.561 32.864 L 38.562 32.864 C 38.661 32.864 38.756 32.825 38.826 32.759 C 38.893 32.691 38.933 32.597 38.933 32.5 L 38.926 29.934 L 42.273 29.929 L 42.281 33.226 L 43.025 33.226 L 43.121 71.689 L 37.172 71.699 L 37.169 70.601 C 37.169 70.196 36.835 69.87 36.426 69.87 C 36.014 69.871 35.681 70.2 35.682 70.603 L 35.685 71.703 L 29.736 71.712 L 29.64 33.246 L 30.383 33.246 L 30.375 29.949 L 38.184 29.936 L 38.183 29.934 Z M 30.453 61.452 L 30.477 70.976 L 33.824 70.971 L 33.822 70.603 C 33.821 69.924 34.093 69.272 34.58 68.791 C 35.067 68.311 35.728 68.041 36.417 68.038 L 36.419 68.038 C 37.11 68.038 37.771 68.304 38.259 68.785 C 38.472 68.995 38.646 69.236 38.773 69.5 L 42.372 69.493 L 42.366 67.295 L 32.699 67.31 L 32.685 61.449 L 30.453 61.452 Z M 34.565 70.97 L 34.938 70.97 L 34.938 70.602 C 34.935 69.793 35.6 69.137 36.422 69.137 C 37.243 69.134 37.91 69.788 37.912 70.598 L 37.912 70.965 L 38.285 70.964 L 38.285 70.597 C 38.283 70.112 38.086 69.646 37.738 69.304 C 37.388 68.961 36.916 68.769 36.422 68.77 L 36.42 68.77 C 35.927 68.77 35.455 68.965 35.108 69.307 C 34.759 69.65 34.565 70.117 34.567 70.602 L 34.568 70.97 L 34.565 70.97 Z M 39.028 70.964 L 42.375 70.957 L 42.373 70.225 L 39 70.232 C 39.017 70.352 39.027 70.474 39.027 70.597 L 39.028 70.964 Z M 42.364 66.562 L 42.283 33.958 L 40.05 33.962 L 40.049 33.228 L 41.537 33.226 L 41.534 32.127 L 39.674 32.131 L 39.675 32.495 C 39.676 32.789 39.559 33.068 39.351 33.272 C 39.143 33.479 38.858 33.595 38.565 33.595 L 38.562 33.595 C 38.266 33.595 37.983 33.482 37.775 33.275 C 37.565 33.07 37.448 32.79 37.447 32.5 L 37.445 32.132 L 31.124 32.142 L 31.129 33.975 L 30.386 33.977 L 30.405 40.936 L 31.519 40.935 L 31.509 36.899 C 31.507 36.609 31.625 36.332 31.833 36.125 C 32.041 35.92 32.323 35.802 32.617 35.802 L 40.063 35.791 C 40.357 35.791 40.639 35.906 40.849 36.11 C 41.058 36.317 41.176 36.594 41.176 36.884 L 41.251 66.562 L 42.365 66.559 L 42.364 66.562 Z M 41.534 31.395 L 41.532 30.662 L 40.973 30.664 L 40.975 31.396 L 41.534 31.395 Z M 40.231 30.664 L 39.672 30.667 L 39.675 31.399 L 40.233 31.396 L 40.231 30.664 Z M 30.406 41.671 L 30.454 60.721 L 32.685 60.717 L 32.682 59.985 L 33.426 59.985 L 33.443 66.58 L 40.506 66.569 L 40.435 37.993 L 32.254 38.004 L 32.265 42.401 L 31.522 42.403 L 31.52 41.671 L 30.406 41.673 L 30.406 41.671 Z M 37.444 31.403 L 37.442 30.672 L 36.884 30.672 L 36.886 31.404 L 37.444 31.403 Z M 36.141 30.673 L 35.398 30.673 L 35.401 31.405 L 36.143 31.404 L 36.141 30.673 Z M 34.653 30.676 L 33.91 30.677 L 33.911 31.408 L 34.656 31.408 L 34.653 30.676 Z M 33.167 30.677 L 32.423 30.679 L 32.426 31.409 L 33.168 31.409 L 33.167 30.677 Z M 31.68 30.679 L 31.121 30.681 L 31.122 31.411 L 31.682 31.411 L 31.68 30.679 Z M 40.432 37.261 L 40.432 36.891 C 40.432 36.795 40.393 36.704 40.323 36.636 C 40.255 36.568 40.161 36.53 40.064 36.53 L 32.619 36.542 C 32.523 36.542 32.429 36.582 32.36 36.648 C 32.292 36.717 32.254 36.808 32.254 36.903 L 32.254 37.274 L 40.435 37.261 L 40.432 37.261 Z M 34.101 33.242 L 34.104 33.975 L 31.871 33.979 L 31.87 33.245 L 34.101 33.242 Z M 40.881 68.033 L 40.884 68.765 L 39.024 68.768 L 39.022 68.037 L 40.881 68.033 Z M 32.707 70.244 L 31.963 70.247 L 31.96 68.78 L 32.702 68.78 L 32.707 70.244 Z M 39.692 38.729 L 39.758 65.837 L 34.183 65.846 L 34.115 38.736 L 39.692 38.729 Z M 34.86 39.468 L 34.924 65.113 L 39.012 65.104 L 38.949 39.463 L 34.86 39.468 Z M 38.208 40.195 L 38.21 40.927 L 35.607 40.931 L 35.606 40.199 L 38.208 40.195 Z M 35.61 42.032 L 36.355 42.031 L 36.41 64.378 L 35.666 64.378 L 35.61 42.032 Z"
            fill="#ff007f" // Cyan fill
            clipPath="url(#ssdClip)" // Clip Path for Dynamic Fill
          />
        </svg>
      </SVGContainer>

      {/* SSD Usage Percentage */}
      <UsageText>{fillPercentage.toFixed(1)}%</UsageText>
    </>
  );
};

// Styled Components
const SVGContainer = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const UsageText = styled.div`
  position: absolute;
  color: #00ffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: flex;
  width: 180px;
  justify-content: center;
`;

export default SSDUsageSVG;
