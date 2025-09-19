/* eslint-disable no-unused-vars */
import { Home, Lightbulb, Shield, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Oświetlenie", icon: Lightbulb },
  { name: "Bezpieczeństwo", icon: Shield },
  { name: "Statystyki", icon: BarChart3 },
];

export const SideBar = () => {
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
          <motion.li key={item.name} variants={itemVariants}>
            <a
              href="#"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${
                index === 0
                  ? "bg-white/10 text-whitte font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SideBar;
