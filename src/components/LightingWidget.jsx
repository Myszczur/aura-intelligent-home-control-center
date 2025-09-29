/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { Lightbulb, Sun } from "lucide-react";

const LightItem = ({ light, onToggle, onBrightnessChange }) => {
  const { name, isOn, brightness } = light;
  const { playSound } = useHome();

  const handleToggleWithSound = () => {
    onToggle();
    playSound("toggle");
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="p-4 rounded-lg bg-black/20 flex flex-col"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-200">{name}</span>

        {/* Przełącznik "Toggle" */}
        <motion.div
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            isOn ? "bg-[#007BFF] justify-end" : "bg-gray-600 justify-start"
          }`}
          onClick={handleToggleWithSound}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
            className="w-4 h-4 bg-white rounded-full"
          />
        </motion.div>
      </div>

      {/* Suwak jasności, który animuje się przy pojawianiu */}
      <AnimatePresence>
        {isOn && (
          <motion.div
            key="brightness-slider"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: "16px" }}
            exit={{ height: 0, opacity: 0, marginTon: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center space-x-3 overflow-hidden"
          >
            <Sun className="w-4 h-4 text-gray-500" />
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => onBrightnessChange(e.target.value)}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider"
            />
            <span className="text-sm text-gray-400 w-8 text-right">
              {brightness}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function LightingWidget() {
  const { homeState, toggleLight, setLightBrightness } = useHome();
  const lihgts = Object.values(homeState.lighting);

  // Liczymy aktywne światła do wyświetlenia w nagłówku
  const activeLightsCount = lihgts.filter((light) => light.isOn).length;

  return (
    <div className="bg-gradient-to-br from-[#2c2c2c] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-white">Oświetlenie</h3>
          <p className="text-sm text-gray-400">
            {activeLightsCount > 0
              ? `${activeLightsCount} włączone`
              : "Wszystkie wyłączone"}
          </p>
        </div>
        <Lightbulb className="text-gray-500" />
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 -mr-2">
        {lihgts.map((light) => (
          <LightItem
            key={light.id}
            light={light}
            onToggle={() => toggleLight(light.id)}
            onBrightnessChange={(brightness) =>
              setLightBrightness(light.id, brightness)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default LightingWidget;
