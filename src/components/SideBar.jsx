import { Home, Lightbulb, Shield, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Oświetlenie", icon: Lightbulb },
  { name: "Bezpieczeństwo", icon: Shield },
  { name: "Statystyki", icon: BarChart3 },
];

export const SideBar = () => {
  // Warianty animacji dla Framer Motion
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

  return (
    <motion.div
      className="w-64 h-screen p-4 flex flex-col bh-black/20 border-r border-white/5 shadow-2xl"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    ></motion.div>
  );
};

export default SideBar;
