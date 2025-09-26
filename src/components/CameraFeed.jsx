/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

function CameraFeed({ camera }) {
  return (
    <div
      className={`relative aspect-video rounded-xl overflow-hidden bg-black/50 border-2 transition-colors ${
        camera.isTriggered ? "border-red-500/80" : "border-transparent"
      }`}
    >
      <img
        src={`https://picsum.photos/seed/${camera.id}/400/225`}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          camera.isTriggered ? "scale-110" : "scale-100"
        }`}
        alt={camera.name}
      />

      {/* Efekt "glitch" podczas alarmu */}
      <AnimatePresence>
        {camera.isTriggered && (
          <motion.div
            className="absolute inset-0 bg-red-500/20"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {camera.name}
      </div>
    </div>
  );
}

export default CameraFeed;
