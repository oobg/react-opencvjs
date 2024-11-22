import "./assets/css/App.css";
import { useEffect, useRef } from "react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imgSrc = "/img/dog1.png";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        if (imgSrc) {
          const backImg = new Image();
          backImg.src = imgSrc;
          backImg.onload = () => {
            context.drawImage(backImg, 0, 0, context.canvas.width, context.canvas.height);
          }
        } else {
          context.fillStyle = "white";
          context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        }
      }
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem"}}>
          <button style={{ borderColor: "lightgray" }}>origin</button>
          <button style={{ borderColor: "lightgray" }}>grey</button>
        </div>
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
        />
      </div>
    </>
  )
}

export default App
