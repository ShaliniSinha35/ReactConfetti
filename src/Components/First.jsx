import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "../App.css";
import Balloon1 from "../../img/ballon1.svg";
import Balloon2 from "../../img/ballon2.svg";
import Balloon3 from "../../img/ballon3.svg";
import Lottie from "lottie-react";
import birthdayAnimation from "../../animation/1.json"; // Update the path
import cornerAnimation from "../../animation/2.json";
import open from "../../animation/openGift.json";
import close from "../../animation/closeGift.json";

import { motion, AnimatePresence } from "framer-motion";
import SlidingMessages from "./SlidingMessages";
import BalloonsPop from "./BalloonsPop";

const messages = [
  "🎉 Wishing you a day filled with love, joy, and lots of cake! 🍰",
  "🎂 May your year be filled with happiness and success! 🎈",
  "🥳 Enjoy your special day to the fullest! 🎁"
];
const balloonsArray = [Balloon1, Balloon2, Balloon3];

const First = () => {
  const [celebrate, setCelebrate] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [balloons, setBalloons] = useState([...Array(5).keys()]);
  const [giftOpened, setGiftOpened] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCelebrate(true);
    }
  }, [countdown]);

  const popBalloon = (id) => {
    setBalloons((prev) => prev.filter((_, i) => i !== id));
    alert(messages[Math.floor(Math.random() * messages.length)]);
  };

  const openGift = () => setGiftOpened(!giftOpened);

  const addHeart = (e) => {
    setHearts([...hearts, { id: Date.now(), x: e.clientX, y: e.clientY }]);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-purple-100 to-blue-200 text-center relative overflow-hidden" onClick={addHeart}>
      {countdown > 0 ? (
        <h1 className="text-6xl font-extrabold text-white mb-4 animated-countdown mt-100 countdown-text">{countdown}</h1>
      ) : (
        <>
          {celebrate && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        

          {celebrate && <BalloonsPop />}
          <Lottie animationData={birthdayAnimation} className="w-72 h-72" />
          <SlidingMessages />

          
          {/* <motion.p
            className="text-lg text-yellow mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Wishing you a day filled with love, joy, and lots of cake! 🍰
          </motion.p> */}
            {!giftOpened ? (
            <Lottie onClick={openGift} animationData={open} className="w-42 h-42" />
        
          ) : (
            <Lottie onClick={openGift} animationData={close} className="w-22 h-22" />
          )}

          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-red-500 text-4xl"
                style={{ left: heart.x, top: heart.y }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1 }}
              >
                ❤️
              </motion.div>
            ))}
          </AnimatePresence>
        </>
      )}

      {celebrate && (
        <Lottie 
          animationData={cornerAnimation} 
          className="absolute bottom-5 right-0 h-50 w-50" 
        />
      )}

      {celebrate && (
        <Lottie 
          animationData={cornerAnimation} 
          className="absolute bottom-2 left-0 h-50 w-50" 
        />
      )}
    </div>
  );
};

export default First;