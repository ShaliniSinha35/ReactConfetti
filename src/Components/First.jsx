import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "../App.css";
import Lottie from "lottie-react";
import birthdayAnimation from "../../animation/1.json";
import cornerAnimation from "../../animation/2.json";
import open from "../../animation/openGift.json";
import close from "../../animation/closeGift.json";
import dance from "../../animation/dance.json";
import fireworks from "../../animation/cracker.json";
import c from "../../animation/c.json";
import { motion, AnimatePresence } from "framer-motion";
import SlidingMessages from "./SlidingMessages";
import BalloonsPop from "./BalloonsPop";
import Balloon1 from "../../img/ballon1.svg";
import Balloon2 from "../../img/ballon2.svg";
import Balloon3 from "../../img/ballon3.svg";

const balloonsArray = [Balloon1, Balloon2, Balloon3];
const messages = [
  "🎉 Wishing you a day filled with love, joy, and lots of cake! 🍰",
  "🎂 May your year be filled with happiness and success! 🎈",
  "🥳 Enjoy your special day to the fullest! 🎁",
];

const Balloons = () => {
  return (
    <div className="balloons-container">
      {[...Array(5)].map((_, i) => {
        const randomBalloon = balloonsArray[Math.floor(Math.random() * balloonsArray.length)];
        return (
          <img
            key={i}
            src={randomBalloon}
            alt="Balloon"
            className={`balloon balloon-${i + 1} fill-none text-inherit`}
            style={{ filter: "none", mixBlendMode: "normal" }}
          />
        );
      })}
    </div>
  );
};
const funnyQuiz = [
  { question: "What do you get when you mix a birthday cake and a computer?", answer: "A lot of bytes!" },
  { question: "Why did the birthday cake go to the doctor?", answer: "Because it was feeling crumby!" },
  { question: "What did one candle say to the other?", answer: "Don't birthdays just burn you out?" },
  { question: "Why did the teddy bear say no to cake?", answer: "Because it was already stuffed!" },
];

const First = () => {
  const [celebrate, setCelebrate] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [giftOpened, setGiftOpened] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [cakeClicks, setCakeClicks] = useState(0);
  const [surpriseUnlocked, setSurpriseUnlocked] = useState(false);
  const [fireworksVisible, setFireworksVisible] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
 
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCelebrate(true);
    }
  }, [countdown]);

  const openGift = () => setGiftOpened(!giftOpened);

  const addHeart = (e) => {
    if (!e.target.closest(".quiz-block")) {
      setHearts([...hearts, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    }
  };
  const nextQuiz = () => {
    setShowAnswer(false);
    setQuizIndex((prev) => (prev + 1) % funnyQuiz.length);
  };
  const clickCake = () => {
    if (!surpriseUnlocked) {
      setCakeClicks(cakeClicks + 1);
      if (cakeClicks + 1 === 5) {
        setSurpriseUnlocked(true);
        setFireworksVisible(true);
        setTimeout(() => setFireworksVisible(false), 5000);
        alert("🎉 Surprise Unlocked! Enjoy the extra celebration!");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen bg-gradient-to-r from-white to-gray-100 text-center relative overflow-hidden"
      onClick={addHeart}
    >
      {countdown > 0 ? (
        <>
          <motion.h1
            className="text-6xl font-extrabold text-black mb-4 mt-20 countdown-text"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Are you ready?
          </motion.h1>
          <motion.h2
            className="text-5xl font-bold text-yellow-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {countdown}
          </motion.h2>
          <Lottie animationData={dance} className="w-40 h-40 mt-4" />
        </>
      ) : (
        <>
          {celebrate && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
             {celebrate && <Balloons />}

          {celebrate && <BalloonsPop />}
          <Lottie
            animationData={birthdayAnimation}
         className="w-48 h-48 cursor-pointer"
            onClick={clickCake}
          />
          <SlidingMessages />

          {!giftOpened ? (
            <Lottie
              onClick={openGift}
              animationData={open}
              className="w-42 h-42 cursor-pointer"
            />
          ) : (
            <Lottie
              onClick={openGift}
              animationData={close}
              className="w-22 h-22 cursor-pointer"
            />
          )}

          {surpriseUnlocked && <h2 className="text-2xl text-white mt-4">🎊 You unlocked a special birthday surprise! 🎊</h2>}
          {fireworksVisible && <Lottie animationData={fireworks} className="w-96 h-96 mt-6" />}

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

             {/* Funny Quiz Section */}
             <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-lg">
            <h3 className="text-xl font-bold text-gray-800">🎭 Funny Birthday Quiz!</h3>
            <p className="text-lg text-gray-700 mt-4">{funnyQuiz[quizIndex].question}</p>
            {showAnswer && <p className="text-lg font-semibold text-pink-500 mt-2">💡 {funnyQuiz[quizIndex].answer}</p>}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={nextQuiz}
            >
              Next Question
            </button>
          </div>
          
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
