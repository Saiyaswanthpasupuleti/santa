import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import image from "../assets/pexels-x-y-1263157-2403402.jpg"; // Same background image

export default function OrganizerPage() {
  const [eventId, setEventId] = useState("");
  const [passcode, setPasscode] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Event ID:", eventId);
    console.log("Passcode:", passcode);
  };

  const generateUniqueId = () => {
    const uniqueId = "EVT-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setEventId(uniqueId);
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Optional overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Motion Div with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-black/50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/40 backdrop-blur-lg"
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center drop-shadow-md">
          Event Organizer
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="eventId" className="text-white font-medium drop-shadow">
              Event ID
            </Label>
            <Input
              id="eventId"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="Enter Event ID"
              className="mt-1 bg-black text-white placeholder-gray-400 border border-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
          <div>
            <Label htmlFor="passcode" className="text-white font-medium drop-shadow">
              Passcode
            </Label>
            <Input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter Passcode"
              className="mt-1 bg-black text-white placeholder-gray-400 border border-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* Create ID Button */}
          <div className="flex justify-between mt-2 mb-4">
            <Button
              type="button"
              onClick={generateUniqueId}
              className="bg-white/20 text-white border border-white text-sm font-semibold py-1 px-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300"
            >
              Create Unique ID
            </Button>
          </div>

          {/* Submit Button */}
          <div>
            <motion.button
              type="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full bg-white/20 text-white border border-white font-semibold py-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300"
            >
              Continue
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
