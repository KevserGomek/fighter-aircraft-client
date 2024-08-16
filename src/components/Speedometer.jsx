import React from 'react';
import SpeedometerArrowSVG from './SVG/SpeedometerArrowSVG';
import SpeedometerCircleSVG from './SVG/SpeedometerCircleSVG'
const Speedometer = ({ speed }) => {
  const rotation = `rotate(${(speed / 100) * 300 - 145}deg)`; 

  return (

    <div style={{ color: 'white', width: '100%', display: "flex", flexDirection: "column", height: "50%" }}>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "30px" }}>
        <SpeedometerCircleSVG></SpeedometerCircleSVG>
        <div style={{ position: "relative", fontSize: "20px", top: "-43px" }}>
          {speed}
          <br />
          KM/H
        </div>
      </div>

      <div style={{ transform: rotation, transformOrigin: 'bottom center', width: "100px", position: "relative", top: "-290px", left: "150px" }}>
        <SpeedometerArrowSVG></SpeedometerArrowSVG>
      </div>

    </div>
  );
};

export default Speedometer;
