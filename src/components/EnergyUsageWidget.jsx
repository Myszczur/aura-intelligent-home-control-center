/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { Zap } from "lucide-react";

const generateChartPath = (data, width, height) => {
  if (data.length === 0) return "M 0 0";
  const max = Math.max(...data, 1);

  let path = `M 0 ${height - (data[0] / max) * height}`;

  data.forEach((point, i) => {
    if (i === 0) return;
    const x = (i / (data.length - 1)) * width;
    const y = height - (point / max) * height;
    path += ` L ${x} ${y}`;
  });

  return path;
};

function EnergyUsageWidget() {
  const { homeState } = useHome();
  const { usageNow, usageToday, history, unit } = homeState.energy;

  const chartWidth = 300;
  const chartHeight = 80;

  const pathData = generateChartPath(history, chartWidth, chartHeight);
  const areaData = `${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="bg-gradient-to-br from-[#2c2c2c] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5 flex flex-col lg:col-span-2">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-white">Energy usage</h3>
          <p className="text-sm text-gray-400">On Live</p>
        </div>
        <Zap className="text-gray-500" />
      </div>

      {/* Główne statystyki */}
      <div className="flex items-end space-x-6 mb-4">
        <div>
          <p className="text-4xl font-light tet-white">{usageNow.toFixed(2)}</p>
          <p className="text-sm text-[#8A2BE2]">{unit} now</p>
        </div>
        <div>
          <p className="text-2xl font-light text-gray-300">
            {usageToday.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">kwh today</p>
        </div>
      </div>

      {/* Animowany wykres SVG */}
      <div className="flex-grow flex items-end">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible"
        >
          {/* Definicja gradientu dla obszaru pod linią i filtra "glow" */}
          <defs>
            <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Obszar pod linią z gradientem */}
          <motion.path
            d={areaData}
            fill="url(#energyGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Linia wykresu z animacją rysowania i efektem "glow" */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#8A2BE2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}

export default EnergyUsageWidget;
