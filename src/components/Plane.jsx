import React from 'react';
import PlaneSVG from './SVG/PlaneSVG';

const Plane = ({ angle }) => {
  const rotation = `rotate(${angle}deg)`;
  
  return (

    <div style={{ color: 'white', width:'60%', display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div style={{transform: rotation, height:"400px", width:"400px"}}>
        <PlaneSVG/>
      </div>
    </div>

  );
};

export default Plane;