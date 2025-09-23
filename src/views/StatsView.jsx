/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import InteractiveChart from "../components/InteractiveChart";
import { BarChart, TrendingUp, Zap, DollarSign } from "lucide-react";

function StatsView() {
  const { homeState } = useHome();
  const { dailyHistory, weeklyHistory, monthlyHistory } = homeState.energy;

  const [timeframe, setTimeframe] = useState("week"); // 'day', 'week', 'month'

  const dataMap = {
    day: dailyHistory,
    week: weeklyHistory,
    month: monthlyHistory,
  };
  const timeFormatMap = { day: "time", week: "date", month: "date" };

  const activeData = dataMap[timeframe];
  const activeTimeFormat = timeFormatMap[timeframe];
  const valuesOnly = activeData.map((d) => d.value);

  // Symulacja kosztów (0.75 PLN za kWh)
  const totalConsumption = valuesOnly.reduce((sum, val) => sum + val, 0);
  const averageConsumption = totalConsumption / valuesOnly.length;
  const peakConsumption = Math.max(...valuesOnly);

  const costPerKwh = 0.75;
  const estimatedCost = totalConsumption * costPerKwh;

  const kpiCards = [
    {
      label: "Average usage",
      value: averageConsumption.toFixed(2),
      unit: "kWh",
      icon: BarChart,
      color: "text-blue-400",
    },
    {
      label: "Highest peak",
      value: peakConsumption.toFixed(2),
      unit: "kWh",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
    {
      label: "Estimated cost",
      value: estimatedCost.toFixed(2),
      unit: "PLN",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      label: "Total usage",
      value: totalConsumption.toFixed(2),
      unit: "kWh",
      icon: Zap,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#2c2c2c] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5">
      <div className="flex items-center mb-8">
        <h2 className="text-3xl font-bold text-white flex-grow">
          Consumption analysis
        </h2>
        <div className="flex items-center space-x-2 p-1 bg-[#252525] rounded-lg">
          <TimeframeButton
            label="Today"
            active={timeframe === "day"}
            onClick={() => setTimeframe("day")}
          />
          <TimeframeButton
            label="7 Days"
            active={timeframe === "week"}
            onClick={() => setTimeframe("week")}
          />
          <TimeframeButton
            label="30 Days"
            active={timeframe === "month"}
            onClick={() => setTimeframe("month")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 bg-dark-card p-6 rounded-2xl shadow-tactile border border-white/5">
          <InteractiveChart
            data={activeData}
            key={timeframe}
            timeFormat={activeTimeFormat}
          />
        </div>
        <div className="xl:col-span-1 space-y-4">
          {kpiCards.map((card, i) => (
            <KpiCard key={i} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Komponenty pomocnicze
const TimeframeButton = ({ label, active, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-md relative ${
      active ? "text-white" : "text-gray-400"
    }`}
  >
    {active && (
      <motion.div
        layoutId="timeframe-active"
        className="absolute inset-0 bg-brand-purple rounded-md"
      />
    )}
    <span className="relative">{label}</span>
  </motion.button>
);

const KpiCard = ({ label, value, unit, icon: Icon, color }) => (
  <div className="bg-dark-card p-4 rounded-xl shadow-tactile border border-white/5 flex items-center space-x-4">
    <div className={`p-3 rounded-lg bg-black/20 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white font-bold text-xl">
        {value} <span className="text-base font-normal">{unit}</span>
      </p>
    </div>
  </div>
);

export default StatsView;
