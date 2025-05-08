import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image from "../assets/pexels-x-y-1263157-2403402.jpg";
import { CiLink } from "react-icons/ci";

export default function ParticipantList() {
  const [participants, setParticipants] = useState([
    { name: "", assignedName: "", link: "" },
  ]);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const values = [...participants];
    values[index][e.target.name] = e.target.value;
    setParticipants(values);
  };

  const removeParticipant = (index) => {
    const values = [...participants];
    values.splice(index, 1);
    setParticipants(values);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-black/50 p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-white/40 backdrop-blur-lg"
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center drop-shadow-md">
          Participant List
        </h1>
        <form className="space-y-6">
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex justify-between space-x-4 items-center"
            >
              <div className="flex-1">
                <Label
                  htmlFor={`name-${index}`}
                  className="text-white font-medium drop-shadow"
                >
                  Participant Name
                </Label>
                <Input
                  id={`name-${index}`}
                  name="name"
                  value={participant.name}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter Participant Name"
                  required
                  className="mt-1 w-full p-2 border border-white focus:ring-2 focus:ring-white focus:outline-none bg-black text-white placeholder-gray-400"
                />
              </div>
              <div className="flex-1">
                <Label
                  htmlFor={`assignedName-${index}`}
                  className="text-white font-medium drop-shadow"
                >
                  Assigned Name
                </Label>
                <Input
                  id={`assignedName-${index}`}
                  name="assignedName"
                  value={participant.assignedName}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter Assigned Name"
                  required
                  className="mt-1 w-full p-2 border border-white focus:ring-2 focus:ring-white focus:outline-none bg-black text-white placeholder-gray-400"
                />
              </div>
              <div className="flex-1">
                <Label
                  htmlFor={`link-${index}`}
                  className="text-white font-medium drop-shadow"
                >
                  Link
                </Label>
                <div className="flex items-center space-x-2 mt-1">
                  <CiLink className="text-white text-2xl" />
                  <Input
                    id={`link-${index}`}
                    name="link"
                    value={participant.link}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Enter Link"
                    required
                    className="w-full p-2 border border-white focus:ring-2 focus:ring-white focus:outline-none bg-black text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={() => removeParticipant(index)}
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                setParticipants([
                  ...participants,
                  { name: "", assignedName: "", link: "" },
                ])
              }
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Add Participant
            </Button>
          </div>
        </form>
        <div className="flex justify-center mt-6">
          <Button
            type="button"
            onClick={() => navigate("/final")}
            className="bg-white/20 text-white border border-white font-semibold py-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300"
          >
            Continue to Final
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

 response = [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "a"]]