import React, { useRef } from "react";
import { motion } from "framer-motion";

const imageAudioData = [
  { src: "../../img/cake.png", message: "Yummy Birthday Cake!", audio: "/audio/cake.mp3" },
  { src: "../../img/balloon.png", message: "Floating with Joy!", audio: "/audio/balloons.mp3" },
  { src: "../../img/gift.png", message: "Surprise Gift!", audio: "/audio/gift.mp3" },
  { src: "../../img/party.png", message: "Party Time!", audio: "/audio/party.mp3" },
];

const ImageTrain = () => {
  const audioRefs = useRef(imageAudioData.map(() => React.createRef()));

  const handleImageClick = (index) => {
    audioRefs.current[index].current.play();
  };

  return (
    <div className="overflow-hidden w-full mt-6">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ ease: "linear", duration: 10, repeat: Infinity }}
      >
        {[...imageAudioData, ...imageAudioData].map((item, index) => (
          <div key={index} className="relative group flex-shrink-0">
            <img
              src={item.src}
              alt={`Image ${index + 1}`}
              className="w-40 h-40 object-contain rounded-lg cursor-pointer"
              onClick={() => handleImageClick(index % imageAudioData.length)}
            />
            <audio ref={audioRefs.current[index % imageAudioData.length]} src={item.audio} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white text-xl font-bold rounded-lg">
              {item.message}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageTrain;
