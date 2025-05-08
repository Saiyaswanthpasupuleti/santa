import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/pexels-x-y-1263157-2403402.jpg";

export default function ExcelUpload() {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("eventID", localStorage.getItem("eventID") || "");

    try {
      // const response = await axios.post("http://localhost:8000/api/randomize-names/", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      console.log("Upload success:", response.data);
      navigate("/participants");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(error.response?.data?.error || "An error occurred while uploading.");
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
        className="relative z-10 bg-black/50 p-10 rounded-2xl shadow-xl w-full max-w-md border-2 border-white/50 backdrop-blur-md hover:shadow-lg transition-shadow duration-300"
        role="form"
        aria-labelledby="form-title"
      >
        <h1
          id="form-title"
          className="text-white text-4xl font-bold mb-6 text-center drop-shadow-md"
        >
          Excel File Upload
        </h1>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* <Label
                htmlFor="file"
                className="text-white text-lg font-medium drop-shadow tracking-wide"
              >
                Upload Excel File
              </Label> */}
            </motion.div>
            <Input
              id="file"
              type="file"
              accept=".xlsx, .xls"
              onChange={onFileChange}
              className="hidden"
              aria-required="true"
              aria-describedby="file-error"
            />
            <label
              htmlFor="file"
              className="bg-white/30 text-white text-base font-semibold py-3 px-6 mt-2 inline-block rounded-md cursor-pointer hover:bg-white/50 transition duration-300 shadow-sm"
              aria-label="Choose Excel file"
            >
              Choose File
            </label>
            {file && (
              <div className="mt-2 text-white text-xs italic bg-black/20 border border-white/40 rounded-md p-2">
                <p>Selected file: {file.name}</p>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white/30 text-white border border-white text-base font-bold py-3 px-6 rounded-md hover:bg-white/75 hover:text-black transition duration-300 shadow-md disabled:opacity-50"
              aria-label="Upload Excel file"
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}