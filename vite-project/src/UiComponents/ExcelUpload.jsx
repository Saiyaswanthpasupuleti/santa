import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/pexels-x-y-1263157-2403402.jpg";
import { useEventContext } from "../context/eventContext";
import toast from "react-hot-toast";

export default function ExcelUpload({ setShowParticipantData, setEventData }) {
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState();
  const { eventId } = useEventContext();
  const navigate = useNavigate();

  // // Function to pick the file (for Expo)
  // const pickFile = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Specify MIME type for Excel files
  //     });

  //     if (result.type === 'success') {
  //       setFileUri(result.uri);
  //       setFileName(result.name);
  //       console.log('File URI:', result.uri);
  //       console.log('File Name:', result.name);
  //     } else {
  //       console.log('No file selected');
  //     }
  //   } catch (error) {
  //     console.error('Error picking file:', error);
  //   }
  // };

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file && !fileUri) {
      toast.error("Please select a file.");
      return;
    }

    const formData = new FormData();

    // Check if fileUri is set (from Expo document picker)
    if (fileUri) {
      formData.append("excel_file", {
        uri: fileUri,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // MIME type for Excel file
        name: fileName,
      });
    } else {
      formData.append("excel_file", file);
    }

    formData.append("eventID", eventId);

    try {
      setIsSubmitting(true); // Start the submitting process
      const response = await axios.post("http://localhost:8000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Server response:", response);

      // Check if the response contains an error regarding column mismatch
      if (response.data.error) {
        toast.error(response.data.error); // Display the error in toast if columns don't match
      } else {
        setSubmitResult(response);
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error(error.response?.data.error);
    } finally {
      setIsSubmitting(false); // Stop the submitting process
    }
  };

  useEffect(() => {
    const fetchSantaPairs = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/get-santa-pairs?eventID=${eventId}`);
        console.log("Santa Pairs:", res.data);

        if (res.data.santaPairs && res.data.santaPairs.length > 0) {
          toast.success("Secret santas assigned.");
          setEventData(res.data);
          setShowParticipantData(true);
        }
      } catch (error) {
        console.error("Failed to fetch Santa pairs:", error);
        toast.error("Failed to fetch Santa pairs. Please try again.");
      }
    };

    if (submitResult) {
      fetchSantaPairs();
    }
  }, [submitResult, setEventData, setShowParticipantData]);

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
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
            {/* <Button
              className="mt-4"
              onClick={pickFile}
            >
              Pick File (Expo)
            </Button> */}
            {fileUri && (
              <div className="mt-2 text-white text-xs italic bg-black/20 border border-white/40 rounded-md p-2">
                <p>Selected file: {fileName}</p>
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

