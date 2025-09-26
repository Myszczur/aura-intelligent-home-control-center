/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { Zap, Sun, Moon, Film, LogOut } from "lucide-react";

const ActionButton = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  colorClass = "bg-[#007BFF]",
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 aspect-square
        bg-gradient-to-br from-[#2c2c2c] to-[#252525]
        border border-white/5 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] relative overflow-hidden"
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Warstwa poświaty dla aktywnych przycisków */}
      {isActive && (
        <motion.div
          className={`absolute inset-0 opacity-50 ${colorClass}`}
          style={{ filter: "blur(15px)" }}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
        />
      )}

      {/* Ikona w kontenerze */}
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 relative z-10
          ${isActive ? `${colorClass}/80` : "bg-white/5"}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-sm text-gray-200 relative z-10">{label}</span>
    </motion.button>
  );
};

function QuickActionsWidget() {
  const { homeState, setScene, setAllLights } = useHome();

  const anyLightOn = Object.values(homeState.lighting).some(
    (light) => light.isOn
  );
  // const allLightsOn = Object.values(homeState.lighting).every(
  //   (light) => light.isOn
  // );

  const handleLightsToggle = () => {
    setAllLights(!anyLightOn);
  };

  // const isLivingRoomOn = homeState.lighting.livingRoom.isOn;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start p-6 pb-2">
        <h3 className="font-bold text-white">Quick actions</h3>
        <Zap className="text-gray-500" />
      </div>
      <div className="grid grid-cols-2 gap-4 p-6 pt-2">
        <ActionButton
          icon={anyLightOn ? Moon : Sun}
          label={anyLightOn ? "Turn Off lights" : "Turn On lights"}
          isActive={anyLightOn}
          onClick={handleLightsToggle}
          colorClass="bg-yellow-500"
        />
        <ActionButton
          icon={Film}
          label="Wieczór Filmowy"
          onClick={() => setScene("movieNight")}
          colorClass="bg-indigo-500"
        />
        <ActionButton
          icon={LogOut}
          label="Wychodzę"
          isActive={homeState.security.status === "armed_away"}
          onClick={() => setScene("goodbye")}
          colorClass="bg-red-500"
        />
      </div>
    </div>
  );
}

export default QuickActionsWidget;
