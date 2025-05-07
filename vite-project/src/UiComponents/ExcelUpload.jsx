import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import image from '../assets/pexels-x-y-1263157-2403402.jpg'; // Replace with your image

export default function ExcelUpload() {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      console.log('File uploaded:', file.name);
    } else {
      console.log('No file uploaded');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Optional overlay for contrast */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
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
              accept=".xlsx,.xls"
              onChange={onFileChange}
              className="mt-1 bg-black text-white placeholder-gray-400 border border-white focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          {/* Upload Button */}
          <div className="flex justify-between mt-2 mb-4">
            <Button
              type="submit"
              className="bg-white/20 text-white border border-white text-sm font-semibold py-1 px-3 rounded-md hover:bg-white/65 hover:text-black transition duration-300"
            >
              Upload
            </Button>
          </div>

          {/* Continue Button */}
          <div>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
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
