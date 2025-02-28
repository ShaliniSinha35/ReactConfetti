import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "../App.css";
import Lottie from "lottie-react";
import birthdayAnimation from "../../animation/1.json";
import cornerAnimation from "../../animation/2.json";
import openGiftAnim from "../../animation/openGift.json";
import closeGiftAnim from "../../animation/closeGift.json";
import dance from "../../animation/dance.json";
import fireworks from "../../animation/cracker.json";
import { motion } from "framer-motion";
import SlidingMessages from "./SlidingMessages";
import BalloonsPop from "./BalloonsPop";
import { Dialog } from "@headlessui/react";
import img1 from "../../img/g1.jpg"
import ImageTrain from "./ImageTrain";

const funnyQuiz = [
  {
    question: "What do you get when you mix a birthday cake and a computer?",
    options: ["A lot of bytes!", "A piece of code", "A virus", "A tasty update"],
    answer: "A lot of bytes!",
  },
  {
    question: "Why did the birthday cake go to the doctor?",
    options: ["It had too many candles", "It was feeling crumby!", "It needed a check-up", "It was melting"],
    answer: "It was feeling crumby!",
  },
  {
    question: "Why did the teddy bear say no to cake?",
    options: ["It was on a diet", "It didn’t like sweets", "Because it was already stuffed!", "It wanted a salad"],
    answer: "Because it was already stuffed!",
  },
];

const imageAudioData = [
  {
    src: "../../img/g1.jpg", 
    message: "This is image 1!",
    audio: "../../audio/audio1.mp3", 
  },
  {
    src: "../../img/g2.jpg", 
    message: "This is image 2!",
    audio: "../../audio/audio1.mp3",
  },
  {
    src: "../../img/g3.jpg", 
    message: "This is image 3!",
    audio: "../../audio/audio1.mp3", 
  },
  {
    src: "../../img/g2.jpg", 
    message: "This is image 3!",
    audio: "../../audio/audio1.mp3", 
  },
  {
    src: "../../img/g1.jpg", 
    message: "This is image 3!",
    audio: "../../audio/audio1.mp3", 
  },
];

const First = () => {
  const [celebrate, setCelebrate] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [giftOpened, setGiftOpened] = useState(false);
  const [fireworksVisible, setFireworksVisible] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showBlackout, setShowBlackout] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRefs = useRef(imageAudioData.map(() => React.createRef()));
  const [hearts, setHearts] = useState([]); 



  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowBlackout(true);
    }
  }, [countdown]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const turnOnLight = () => {
    setLightOn(true);
    setShowBlackout(false);
    setCelebrate(true); // Start celebration after turning on light
  };

  const openGift = () => {
    setGiftOpened(true);
    setFireworksVisible(true);
    setCelebrate(true); // Start Confetti
    setTimeout(() => {
      setFireworksVisible(false);
    }, 5000);
  };

  const startQuiz = () => {
    setQuizOpen(true);
    setQuizIndex(0);
    setSelectedOption(null);
  };

  const nextQuestion = () => {
    setQuizIndex((prev) => (prev + 1) % funnyQuiz.length);
    setSelectedOption(null);
  };

  const handleImageClick = (index) => {
    audioRefs.current[index].current.play();
  };
  const addHeart = (e) => {
    if (!e.target.closest(".quiz-block")) {
      setHearts([...hearts, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    }
  };


  return (
    <div onClick={addHeart} className="flex flex-col items-center h-screen bg-gradient-to-r from-white to-gray-100 text-center relative overflow-hidden">
      {countdown > 0 ? (
        <>
          <motion.h1
            className="text-6xl font-extrabold text-black mb-4 mt-20"
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
          {showBlackout && (
            <motion.div
              className="absolute inset-0 bg-black flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: lightOn ? 0 : 1 }}
              transition={{ duration: 1 }}
            >
              {!lightOn && (
                <button
                  onClick={turnOnLight}
                  className="px-6 py-3 bg-yellow-400 text-black text-xl font-bold rounded-lg shadow-lg"
                >
                  Turn on the Light 🔆
                </button>
              )}
            </motion.div>
          )}

          {lightOn && (
            <>
              {celebrate && <Confetti width={windowSize.width} height={windowSize.height} />}
              {celebrate && <BalloonsPop />}
              <Lottie animationData={birthdayAnimation} className="w-48 h-48 cursor-pointer" />

              <SlidingMessages />
            

              {/* {!giftOpened ? (
                <Lottie onClick={openGift} animationData={openGiftAnim} className="w-52 h-52 cursor-pointer" />
              ) : (
                <Lottie animationData={closeGiftAnim} className="w-72 h-72" />
              )} */}

              {fireworksVisible && <Lottie animationData={fireworks} className="fixed top-0 left-0 w-full h-full" />}

         

              {celebrate && <Lottie animationData={cornerAnimation} className="absolute bottom-5 right-0 h-50 w-50" />}
              {celebrate && <Lottie animationData={cornerAnimation} className="absolute bottom-2 left-0 h-50 w-50" />}

              {/* Hoverable Images Section */}
              <div className="flex gap-4 mt-6">
                {imageAudioData.map((item, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={item.src}
                      alt={`Image ${index + 1}`}
                      className="w-40 h-40 object-cover rounded-lg cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    />
                    <audio ref={audioRefs.current[index]} src={item.audio} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white text-xl font-bold rounded-lg">
                      {item.message}
                    </div>
                  </div>
                ))}
              </div>

              <ImageTrain></ImageTrain>

              <button
                onClick={startQuiz}
                className="mt-6 px-6 py-3 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700"
              >
                🎭 Start Funny Quiz!
              </button>

              <Dialog open={quizOpen} onClose={() => setQuizOpen(false)} className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                  <h3 className="text-xl font-bold text-gray-800">🎉 Funny Birthday Quiz!</h3>
                  <p className="text-lg text-gray-700 mt-4">{funnyQuiz[quizIndex].question}</p>
                  <div className="mt-4 space-y-2">
                    {funnyQuiz[quizIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        className={`block w-full py-2 px-4 rounded-lg border ${
                          selectedOption === option
                            ? option === funnyQuiz[quizIndex].answer
                              ? "bg-green-400 text-white"
                              : "bg-red-400 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => setSelectedOption(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={nextQuestion}>
                    Next Question
                  </button>
                  <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg ml-5" onClick={()=>setQuizOpen(false)}>
                    Close Quiz
                  </button>
                </div>
              </Dialog>


           
       
            </>
          )}

                 {/* Heart Animation (Now Correctly Placed) */}
  {/* <AnimatePresence>
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
  </AnimatePresence> */}
        </>
      )}

 
    </div>
  );
};

export default First;
