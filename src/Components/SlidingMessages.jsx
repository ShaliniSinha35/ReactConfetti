import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "🎉 Wishing you a day filled with love, joy, and lots of cake! 🍰",
  "🎂 May your year be filled with happiness and success! 🎈",
  "🥳 Enjoy your special day to the fullest! 🎁"
];

const SlidingMessages = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index} // Important for animation
          className="text-lg text-yellow mb-4 absolute"
          initial={{ opacity: 0, x: 100 }}  // Start from right
          animate={{ opacity: 1, x: 0 }}    // Slide to center
          exit={{ opacity: 0, x: -100 }}    // Slide out to the left
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default SlidingMessages;
