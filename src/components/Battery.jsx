import React, { useState, useEffect } from 'react';
import BatterySVG from './SVG/BatterySVG';
import "../styles/battery.css"
const Battery = ({ battery }) => {

  const [isBlinking, setIsBlinking] = useState(null);
  const batteryColor = battery > 50 ? "green" : battery > 25 ? "yellow" : "red";
  const fullSegmentsCount = Math.floor(battery / 25);
  const lastSegmentFillPercentage = battery % 25;

  useEffect(() => {
    if (battery < 20) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false)
    }
    console.log(isBlinking)
  }, [battery])

  const segmentStyle = {

    width: "100%",
    backgroundColor: batteryColor,
    borderRadius: "4px",
    position: "absolute",

  }
  
  return (

    <div style={{ color: 'white', width: '100%', height: "330px", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <div className={isBlinking ? "blink" : ""} style={{ height: "320" }}>
        <div className={isBlinking ? "blink" : ""} style={{ position: "absolute", top: "60px", left: "783px" }}>{battery}%</div>
        <BatterySVG />
      </div>

      <div style={{ position: "relative", width: "110px", height: "300px", top: "-55px" }}>
        {Array.from({ length: fullSegmentsCount }).map((_, i) => (
          <div
            key={i}
            style={{ ...segmentStyle, animation: isBlinking ? "blink 1s linear infinite" : "none", height: "55px", bottom: `${i * 60}px` }}
          ></div>
        ))}

        {lastSegmentFillPercentage > 0 && (
          <div style={{
            ...segmentStyle,
            animation: isBlinking ? "blink 1s linear infinite" : "none",
            height: `${(lastSegmentFillPercentage / 25) * 60}px`,
            bottom: `${fullSegmentsCount * 60}px`,
          }}></div>
        )}
      </div>
    </div>
    
  );
};

export default Battery;
