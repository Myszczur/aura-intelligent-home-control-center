/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { Shield, ShieldOff, ShieldCheck } from "lucide-react";
import CameraFeed from "../components/CameraFeed";

function SecurityView() {
  const { homeState, setSecurityStatus } = useHome();
  const { status, sensors, eventLog } = homeState.security;

  const cameras = sensors.filter((sensor) => sensor.type === "camera");
  const logIcon = { info: "ℹ️", alert: "🚨" };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Lewa kolumna: Kontrola i Dziennik Zdarzeń */}
      <div className="lg:col-span-1 space-y-8">
        {/* Panel Kontrolny */}
        <div className="bg-dark-card p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
          <div className="grid grid-cols-3 gap-3">
            <SecurityButton
              label="Disarmed"
              icon={ShieldOff}
              isActive={status === "disarmed"}
              onClick={() => setSecurityStatus("disarmed")}
            />
            <SecurityButton
              label="System Armed (Home)"
              icon={Shield}
              isActive={status === "armed_home"}
              onClick={() => setSecurityStatus("armed_home")}
            />
            <SecurityButton
              label="System Armed (Away)"
              icon={ShieldCheck}
              isActive={status === "armed_away"}
              onClick={() => setSecurityStatus("armed_away")}
            />
          </div>
        </div>

        {/* Dziennik Zdarzeń */}
        <div className="bg-dark-card p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Event Log</h2>
          <div className="space-y-3 h-96 overflow-y-auto pr-2 -mr-2">
            <AnimatePresence>
              {eventLog.map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-start text-sm"
                >
                  <span className="w-6">{logIcon[log.level] || "ℹ️"}</span>
                  <span className="text-gray-400 mr-3">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-white flex-grow">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Prawa, większa kolumna: Podgląd z kamer */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-white mb-4">Live camera view</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cameras.map((cam) => (
            <CameraFeed key={cam.id} camera={cam} />
          ))}
        </div>
      </div>
    </div>
  );
}

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

export default SecurityView;
