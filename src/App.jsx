import Plane from './components/Plane';
import Speedometer from './components/Speedometer';
import Battery from './components/Battery';
import { useState, useEffect } from 'react';

const App = () => {
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    const ws = new WebSocket('ws://localhost:5175');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.eventName) {
        case 'PLANE_ANGLE':
          setAngle(data.data.angle);
          break;
        case 'PLANE_SPEED':
          setSpeed(data.data.speed);
          break;
        case 'PLANE_BATTERY':
          setBattery(data.data.battery);
          console.log(data.data.battery)
          break;
        default:
          break;
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleStartButtonClick = () => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send("START");
    }
  };

  const handleStopButtonClick = () => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send("STOP");
    }
  };

  return (

    <div style={{ backgroundColor: 'black', color: 'white', width: '1000px', height: '800px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ color: 'white', display: "flex", height: "90%" }}>
        <Plane Plane angle={angle}></Plane>
        <div style={{ color: 'white', width: '40%', display: "flex", flexDirection: "column" }}>
          <Battery battery={battery}></Battery>
          <Speedometer speed={speed}></Speedometer>
        </div>
      </div>

      <div style={{ color: 'white', display: 'flex', justifyContent: "center", alignItems: "center", gap: "30px", marginTop: "16px" }}>
        <button style={{ backgroundColor: 'green', color: 'white', border: "none", width: "170px", height: "50px", borderRadius: "5px" }} onClick={handleStartButtonClick}>Start</button>
        <button style={{ backgroundColor: 'red', color: 'white', border: "none", width: "170px", height: "50px", borderRadius: "5px" }} onClick={handleStopButtonClick}>Stop</button>
      </div>
    </div>
    
  );
};

export default App;
