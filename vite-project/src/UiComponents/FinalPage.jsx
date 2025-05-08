import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function FinalPage() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center text-3xl font-bold"
      style={{ backgroundColor: "black", color: "white" }}
    >
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={true}
        numberOfPieces={100}
        gravity={0.15}
      />
      🎊 Congratulations 🎊
    </div>
  );
}