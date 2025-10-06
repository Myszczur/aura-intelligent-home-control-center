/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import * as LucideIcons from "lucide-react";

function SuggestionWidget() {
  const { homeState, setScene, setSecurityStatus, dismissSuggestion } =
    useHome();
  const suggestion = homeState.suggestion;

  if (!suggestion) {
    return null;
  }

  const handleAction = () => {
    switch (suggestion.actionType) {
      case "SET_SCENE":
        setScene(suggestion.actionPayload);
        break;
      case "SET_SECURITY_STATUS":
        setSecurityStatus(suggestion.actionPayload);
        break;
      default:
        break;
    }
    dismissSuggestion();
  };

  const IconComponent = LucideIcons[suggestion.icon] || LucideIcons.Info;

  return (
    <AnimatePresence>
      {suggestion && (
        <motion.div
          key={suggestion.id}
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 20, height: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-card/50 backdrop-blur-lg border border-border-primary rounded-xl mb-8 flex items-center p-4 overflow-hidden"
        >
          <div className="p-2 bg-[#8A2BE2]/20 rounded-full mr-4">
            <IconComponent className="w-6 h-6 text-[#8A2BE2]" />
          </div>
          <p className="flex-grow text-text-primary text-sm">
            {suggestion.message}
          </p>

          {/* Przyciski akcji i zamykania */}
          <div className="flex items-center space-x-2 ml-4">
            {suggestion.actionType && (
              <motion.button
                onClick={handleAction}
                className="px-4 py-2 bg-[#8A2BE2] text-white text-sm font-semibold rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tak
              </motion.button>
            )}
            <motion.button
              onClick={dismissSuggestion}
              className="p-2 text-text-secondary rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <LucideIcons.X className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SuggestionWidget;
