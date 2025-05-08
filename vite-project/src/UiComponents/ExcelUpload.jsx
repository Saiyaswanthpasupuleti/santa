import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import image from "../assets/pexels-x-y-1263157-2403402.jpg";

export default function ExcelUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
      console.log("Temporary file URL:", URL.createObjectURL(selectedFile));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an Excel file.");
      return;
    }

    console.log("Uploading file...");
    console.log("File name:", file.name);
    console.log("File type:", file.type);
    console.log("File size:", file.size, "bytes");

    const formData = new FormData();
    formData.append("excelFile", file); // Match backend key name

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload success:", result);
        navigate("/participants");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading.");
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
      >
        <h1 className="text-white text-3xl font-bold mb-6 text-center drop-shadow-md">
          Excel File Upload
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label htmlFor="file" className="text-white font-medium drop-shadow">
              Upload Excel File
            </Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx, .xls"
              onChange={onFileChange}
              className="mt-1 bg-black text-white placeholder-gray-400 border border-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-2 mb-4">
            <Button
              type="submit"
              className="bg-white/20 text-white border border-white text-sm font-semibold py-1 px-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300"
            >
              Upload
            </Button>
          </div>
          <div>
            <motion.button
              type="button"
              onClick={() => navigate("/participants")}
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
