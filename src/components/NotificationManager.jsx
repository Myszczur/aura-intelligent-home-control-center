/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { CheckCircle, Info, XCircle, AlertTriangle, X } from "lucide-react";

const notificationConfig = {
  success: { icon: CheckCircle, color: "text-green-400" },
  info: { icon: Info, color: "text-blue-400" },
  warning: { icon: AlertTriangle, color: "text-yellow-400" },
  error: { icon: XCircle, color: "text-red-400" },
};

const Notification = ({ notification, onRemove }) => {
  const { id, message, type } = notification;
  const config = notificationConfig[type] || notificationConfig.info;
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.5, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="mb-4"
    >
      <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg flex items-start space-x-3 w-80">
        <Icon className={`${config.color} w-6 h-6 flex-shrink-0 mt-0.5`} />
        <p className="text-sm text-gray-200 flex-grow">{message}</p>
        <button
          onClick={() => onRemove(id)}
          className="p-1 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

function NotificationManager() {
  const { homeState, removeNotification } = useHome();
  const { notifications } = homeState;

  return (
    // Pozycjonowanie kontenera w prawym górnym rogu
    <div className="fixed top-6 right-6 z-50">
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification
            key={n.id}
            notification={n}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default NotificationManager;
