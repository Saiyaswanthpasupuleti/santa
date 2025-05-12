import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import image from "../assets/pexels-x-y-1263157-2403402.jpg";
import toast from "react-hot-toast";
import { useEventContext } from "../context/eventContext"; // ✅ Added context import

const OrganizerPage = ({ onAuth }) => {
  const [eventId, setEventId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingId, setIsGeneratingId] = useState(false);
  const navigate = useNavigate();
  const { login } = useEventContext(); // ✅ Use event context

  // Fetch a unique event ID from the backend
  const fetchUniqueId = async () => {
    setMessage("");
    setMessageType("");
    setIsGeneratingId(true);

    try {
      const response = await axios.get("http://localhost:8000/api/generate-unique-id/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setEventId(response.data);
      toast.success("Unique Event ID generated!");
      setMessageType("success");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to generate unique ID. Please try again.";
      setMessage(`❌ ${errorMsg}`);
      setMessageType("error");
    } finally {
      setIsGeneratingId(false);
    }
  };

  // Validate the form inputs
  const validateForm = () => {
    if (!eventId.trim()) {
      setMessage("⚠️ Event ID is required");
      setMessageType("warning");
      return false;
    }
    if (!passcode.trim()) {
      setMessage("⚠️ Passcode is required");
      setMessageType("warning");
      return false;
    }
    return true;
  };

  // Submit the form
  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create-event/",
        {
          eventID: eventId,
          password: passcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        login(eventId); // ✅ Call context login
        onAuth(); // ✅ Optional: retain your custom auth handler
        navigate(`/${eventId}`); // ✅ Dynamic route navigation
        setTimeout(() => toast.success(response.data.message), 0);
      } else {
        const errorMsg = response.data.error || "An unexpected error occurred.";
        setMessage(`❌ ${errorMsg}`);
        setMessageType("error");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to create or login to event. Please try again.";
      setMessage(`❌ ${errorMsg}`);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        className="relative z-10 bg-black/50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/40 backdrop-blur-lg"
        role="form"
        aria-labelledby="form-title"
      >
        <h1
          id="form-title"
          className="text-white text-3xl font-bold mb-6 text-center drop-shadow-md"
        >
          Event Organizer
        </h1>
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="eventId" className="text-white font-medium drop-shadow">
              Event ID
            </Label>
            <Input
              id="eventId"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="Enter Event ID"
              className="mt-1 bg-black/50 text-white placeholder-gray-400 border border-white/40 focus:ring-2 focus:ring-white focus:outline-none rounded-md"
              disabled={isSubmitting || isGeneratingId}
              aria-required="true"
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
              className="mt-1 bg-black/50 text-white placeholder-gray-400 border border-white/40 focus:ring-2 focus:ring-white focus:outline-none rounded-md"
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>

          {message && (
            <div
              className={`text-sm mt-2 ${
                messageType === "success"
                  ? "text-green-400"
                  : messageType === "error"
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}
              role="alert"
              aria-live="assertive"
            >
              {message}
            </div>
          )}

          <div className="flex justify-between mt-2 mb-4">
            <Button
              type="button"
              className="bg-white/20 text-white border border-white/40 text-sm font-semibold py-1 px-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300 disabled:opacity-50"
              onClick={fetchUniqueId}
              disabled={isSubmitting || isGeneratingId}
              aria-label="Generate unique event ID"
            >
              {isGeneratingId ? "Generating..." : "Create Unique ID"}
            </Button>
          </div>

          <div>
            <motion.button
              type="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full bg-white/20 text-white border border-white/40 font-semibold py-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300 disabled:opacity-50"
              disabled={isSubmitting || isGeneratingId}
              aria-label="Submit event creation form"
            >
              {isSubmitting ? "Submitting..." : "Continue"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

OrganizerPage.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

export default OrganizerPage;
