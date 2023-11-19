import React from "react";
import { motion } from "framer-motion";

const Penalty = () => {
  const arr = ["사과", "배", "포도", "망고", "수박", "귤", "딸기", "바나나"];

  const variants = {
    visible: { opacity: 0.7, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <div>
      {arr.map((item, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.2, ease: "easeInOut", delay: 0.2 * index }}
        >
          <div style={{ textAlign: "center", fontSize: "40px" }}>{item}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Penalty;
