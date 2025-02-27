import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon1 from "../../img/ballon1.svg";
import Balloon2 from "../../img/ballon2.svg";
import Balloon3 from "../../img/ballon3.svg";

const balloonsArray = [Balloon1, Balloon2, Balloon3];

const BalloonsPop = () => {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    // Spawn a new balloon every 1 second
    const interval = setInterval(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          src: balloonsArray[Math.floor(Math.random() * balloonsArray.length)],
          left: Math.random() * 90, // Random left position (0-90%)
          bottom: Math.random() * 50 // Random bottom position (0-50%)
        }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const popBalloon = (id) => {
    setBalloons((prev) => prev.filter((balloon) => balloon.id !== id));
  };
  const balloonsArray = [Balloon1, Balloon2, Balloon3];

const Balloons = () => {
  return (
    <div className="balloons-container">
      {[...Array(5)].map((_, i) => {
        const randomBalloon = balloonsArray[Math.floor(Math.random() * balloonsArray.length)];
        return <img key={i} src={randomBalloon} alt="Balloon" className={`balloon balloon-${i + 1}`} />;
      })}
    </div>
  );
};

  return (
    <div className="fixed w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.img
            key={balloon.id}
            src={balloon.src}
            className="absolute pointer-events-auto cursor-pointer"
            onClick={() => popBalloon(balloon.id)}
            style={{
              left: `${balloon.left}%`,
              bottom: `${balloon.bottom}%`,
              width: "150px",
              height: "150px"
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ y: "-100vh", scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 6, ease: "linear" }}
            whileTap={{ scale: 1.5 }} // Pop effect on click
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BalloonsPop;
