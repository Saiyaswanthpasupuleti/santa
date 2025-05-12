import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import image from "../assets/pexels-x-y-1263157-2403402.jpg";
import { useEventContext } from "../context/eventContext";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons'; // or use free-regular-svg-icons if it's the regular version

export default function ParticipantList({ eventData }) {
  const navigate = useNavigate();
  const [santaPairs, setSantaPairs] = useState([])
  const {eventId} = useEventContext();
 
  useEffect(function fetchPairs() {
    const fetchPairs = async function() {
      try {
        const updatedData = eventData.santaPairs.map(item => {
          const [first, second] = item.santaPair.split(' -> '); // ✅ correct property
          return { 
            ...item, 
            santaPair: { first, second }
          };
        });
        console.log(updatedData);
        setSantaPairs(updatedData);
      } catch (error) {
        console.error("Error fetching santa pairs:", error);
      }
    };
  
    fetchPairs();
  }, []);

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => toast.success('URL copied to clipboard'))
      .catch((error) => toast.error('Failed to copy:' + error))
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-black/50 p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-white/40 backdrop-blur-lg"
      >
        <h1 className="text-white text-4xl font-semibold mb-8 text-center drop-shadow-lg">
          🎁 Secret Santa Pairs List
        </h1>

        <div className="space-y-6">
          {santaPairs.length === 0 ? (
            <p className="text-center text-white text-lg">Loading Santa pairs...</p>
          ) : (
            santaPairs.map(function (item, index) {
              return (
                <div
                  key={index}
                  className="bg-black/40 text-white p-6 rounded-lg border border-white/20 shadow-lg flex justify-between items-center transition-transform transform hover:scale-105"
                >
                  <span className="text-xl font-semibold">
                  <span style={{ color: "#9c445a" }}>{item.santaPair.first}</span> has been assigned as a secret santa for <span className="text-green-700">{item.santaPair.second}</span>
                  </span>
                  {/* <a
                    onClick={() => copyToClipboard(`http://localhost:5173/reveal-secret-santa?eventID=${eventId}&id=${item.id}`)}
                    className="text-blue-400 underline hover:text-blue-200 transition"
                  >
<FontAwesomeIcon icon="fa-regular fa-link" />
                  </a> */}
                  <a
  onClick={() =>
    copyToClipboard(
      `http://localhost:5173/reveal-secret-santa?eventID=${eventId}&id=${item.id}`
    )
  }
  className="text-blue-400 underline hover:text-blue-200 transition cursor-pointer"
>
 <FontAwesomeIcon icon={faLink}  />
  
</a>

                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>

  );
}