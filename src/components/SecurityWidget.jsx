/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { Shield, ShieldOff, ShieldCheck, DoorOpen, Radar } from "lucide-react";

const statusConfig = {
  disarmed: {
    label: "Disarmed",
    icon: ShieldOff,
    color: "text-gray-400",
  },
  armed_home: {
    label: "System Armed (Home)",
    icon: Shield,
    color: "text-[#007BFF]",
  },
  armed_away: {
    label: "System Armed (Away)",
    icon: ShieldCheck,
    color: "text-[#8A2BE2]",
  },
};

const SecurityWidget = () => {
  const { homeState, setSecurityStatus } = useHome();
  const { status, sensors } = homeState.security;

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-white">Security</h3>
        <currentStatus.icon
          className={`transition-colors duration-300 ${currentStatus.color}`}
        />
      </div>

      {/* Aktualny status systemu */}
      <div className="text-center my-4">
        <p
          className={`text-2xl font-semibold transition-colors duration-300 ${currentStatus.color}`}
        >
          {currentStatus.label}
        </p>
      </div>

      {/* Przyciski do zmiany statusu - kluczowy element "Tactile" */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <SecurityButton
          label="Rozbrój"
          icon={ShieldOff}
          isActive={status === "disarmed"}
          onClick={() => setSecurityStatus("disarmed")}
        />
        <SecurityButton
          label="W domu"
          icon={Shield}
          isActive={status === "armed_home"}
          onClick={() => setSecurityStatus("armed_home")}
        />
        <SecurityButton
          label="Wyjście"
          icon={ShieldCheck}
          isActive={status === "armed_away"}
          onClick={() => setSecurityStatus("armed_away")}
        />
      </div>

      {/* Lista czujników */}
      <div className="space-y-3 flex-grow overflow-y-auto pr-2">
        <h4 className="text-sm text-gray-400 font-semibold mb-2">Sensors</h4>
        {sensors.map((sensor) => (
          <SensorItem key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </div>
  );
};

// Komponent przycisku do zmiany statusu
const SecurityButton = ({ label, icon: Icon, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`p-2 rounded-lg text-xs flex flex-col items-center space-y-1 transition-all
      ${
        isActive
          ? "bg-white/15 text-white"
          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    whileHover={{ scale: isActive ? 1 : 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.button>
);

// Komponent elementu listy czujników z animacją
const SensorItem = ({ sensor }) => {
  // Wybierzmy ikonę w zależności od typu czujnika
  const Icon = sensor.id.includes("door") ? DoorOpen : Radar;

  return (
    <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-500" />
        <span className="text-sm text-gray-300">{sensor.name}</span>
      </div>
      <AnimatePresence>
        {sensor.isTriggered && (
          <motion.div
            className="w-2 h-2 rounded-full bg-red-500"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ boxShadow: "0 0 8px rgba(255, 0, 0, 0.7)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecurityWidget;
