import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const LoadingPage = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <motion.div
        className="flex flex-col items-center text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="p-4 bg-gray-100 rounded-full shadow-md"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Loader className="w-12 h-12 text-gray-600" />
        </motion.div>
        <p className="mt-4 text-xl font-medium">Loading{dots}</p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
