/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Power } from "lucide-react";

function AdvancedLightControl({
  light,
  onToggle,
  onBrightnessChange,
  onColorChange,
}) {
  const { name, isOn, brightness, color } = light;
  const hue = parseInt(color.match(/hsl\((\d+),/)[1]);

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="bg-black/20 p-6 rounded-2xl flex flex-col relative overflow-hidden"
    >
      {/* Kolorowe tło imitujące poświatę */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${color.replace(
                ")",
                ", 0.3)"
              )} 0%, transparent 70%)`,
              filter: "blur(30px)",
            }}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center relative z-10">
        <h3 className="font-bold text-white text-lg">{name}</h3>
        <motion.button
          onClick={onToggle}
          whileTap={{ scale: 0.8 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
            isOn ? "bg-white" : "bg-white/10"
          }`}
        >
          <Power
            className={`w-6 h-6 transition-colors ${
              isOn ? "text-brand-purple" : "text-white"
            }`}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOn && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: "24px" }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden relative z-10 space-y-4"
          >
            {/* Suwak jasności */}
            <div className="space-y-2">
              {" "}
              <div className="flex justify-between text-sm text-gray-400">
                <span>Jasność</span>
                <span>{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => onBrightnessChange(e.target.value)}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider"
              />
            </div>

            {/* Suwak koloru (HUE) */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Color</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) =>
                  onColorChange(`hsl(${e.target.value}, 100%, 75%)`)
                }
                className="w-full h-1.5 bg-gradient-to-r from-red-500 via-yellow-500,green-500,blue-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AdvancedLightControl;
