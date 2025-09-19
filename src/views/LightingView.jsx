/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import AdvancedLightControl from "../components/AdvancedLightControl";
import { Lightbulb, LightbulbOff } from "lucide-react";

function LightingView() {
  const {
    homeState,
    toggleLight,
    setLightBrightness,
    setLightColor,
    setAllLights,
  } = useHome();
  const lights = Object.values(homeState.lighting);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      {/* Sekcja głównych kontrolek */}
      <div className="flex items-center space-x-4 mb-8">
        <h2 className="text-3xl font-bold text-white flex-grow">Lighting</h2>
        <motion.button
          onClick={() => setAllLights(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb className="w-5 h-5" />
          <span>Turn On All</span>
        </motion.button>
        <motion.button
          onClick={() => setAllLights(false)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/5 text-gray-400 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LightbulbOff className="w-5 h-5" />
          <span>Turn Off All</span>
        </motion.button>
      </div>

      {/* Siatka z kontrolerami świateł */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {lights.map((light) => (
          <AdvancedLightControl
            key={light.id}
            light={light}
            onToggle={() => toggleLight(light.id)}
            onBrightnessChange={(brightness) =>
              setLightBrightness(light.id, brightness)
            }
            onColorChange={(color) => setLightColor(light.id, color)}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default LightingView;
