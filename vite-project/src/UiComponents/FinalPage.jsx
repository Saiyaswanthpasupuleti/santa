import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import axios from "axios";

export default function FinalPage({ santaData }) {
  const location = useLocation();

  // Use URLSearchParams to get query parameters
  const queryParams = new URLSearchParams(location.search);
  const eventID = queryParams.get("eventID");
  const id = queryParams.get("id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [resData, setResData] = useState({ first: "", second: "" });

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

  useEffect(() => {
    const getPairNames = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/get-specific-pair/?eventID=${eventID}&id=${id}`
        );
        const [first, second] = res.data.santaPair.split(" -> ");
        setResData({ first, second });
      } catch (err) {
        console.error(err);
        setError("Failed to load your Secret Santa pair.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if both params exist
    if (eventID && id) {
      getPairNames();
    } else {
      setLoading(false);
    }
  }, [eventID, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-4 relative">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={true}
        numberOfPieces={150}
        gravity={0.2}
      />
  
      {id ? (
        loading ? (
          <p className="text-xl animate-pulse">Loading your Secret Santa... 🎅</p>
        ) : error ? (
          <p className="text-red-400 text-lg">{error}</p>
        ) : santaData ? (
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-pink-400 drop-shadow-lg">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-2xl font-medium text-white">
              You’ve been assigned as a <span className="text-green-300 font-bold">Secret Santa</span> for:
            </p>
            <p className="text-3xl font-extrabold text-yellow-400 underline underline-offset-4">
              {santaData.name}
            </p>
            {santaData.message && (
              <p className="text-lg italic text-white/80 max-w-lg mx-auto">
                "{santaData.message}"
              </p>
            )}
          </div>
        ) : (
          <div className="text-center space-y-3">
  <h2 className="text-3xl font-semibold drop-shadow-sm text-white">
    🎁 You are Secret Santa for  
  </h2>
  <p className="text-5xl font-extrabold bg-gradient-to-br from-green-400 via-red-600 to-yellow-300 bg-clip-text text-transparent animate-pulse">
    {resData.second}
  </p>
</div>

        )
      ) : (
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-rose-400">🎄 Secret Santa Event Completed! 🎄</h2>
          <p className="text-lg">Thank you for organizing your Secret Santa event!</p>
          <p className="italic text-white/70 text-md">
            All participants have been successfully assigned.
          </p>
        </div>
      )}
    </div>
  );
}  