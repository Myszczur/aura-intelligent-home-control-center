/* eslint-disable no-unused-vars */
import {
  Home,
  Lightbulb,
  Shield,
  BarChart3,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { path } from "motion/react-client";
import { useHome } from "../context/HomeEngineContext";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Oświetlenie", icon: Lightbulb, path: "/lighting" },
  { name: "Bezpieczeństwo", icon: Shield, path: "/security" },
  { name: "Statystyki", icon: BarChart3, path: "/stats" },
];

export const SideBar = () => {
  const { areSoundsEnabled, toggleSounds, playSound } = useHome();

  // Warianty animacji dla Framer
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1, // Animuj dzieci (linki) jedno po drugim
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const handleMouseEnter = () => {
    playSound("hover", { isHover: true });
  };

  return (
    <motion.div
      className="w-64 h-screen p-4 flex flex-col bh-black/20 border-r border-white/5 shadow-2xl"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-2xl font-bold text-white mb-10 flex items-center space-x-2 p-2">
        <span className="w-8 h-8 bg-brand-purple rounded-full"></span>
        <span>AURA</span>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.name}
            variants={itemVariants}
            onMouseEnter={handleMouseEnter}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 
                ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          </motion.li>
        ))}
      </ul>
      <button onClick={toggleSounds}>
        {areSoundsEnabled ? <Volume2 /> : <VolumeX />}
      </button>
    </motion.div>
  );
};

export default SideBar;
