/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

function Loader() {
  const loaderVariants = {
    animation: {
      scale: [1, 1.2, 1],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
    },
  };
  return (
    <div className="w-full h-full flex items-center justify-center absolute inset-0">
      <motion.div
        className="w-16 h-16 bg-[#8A2BE2] rounded-full shadow-lg"
        variants={loaderVariants}
        animate="animation"
        style={{ boxShadow: "0 0 20px rgba(138, 43, 226, 0.7" }}
      />
    </div>
  );
}

export default Loader;
