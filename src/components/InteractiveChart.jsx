/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

function InteractiveChart({ data, unit = "kwh", timeFormat }) {
  const [tooltip, setTooltip] = useState(null);

  const chartWidth = 800;
  const chartHeight = 300;
  const padding = 50;

  // 1. Modyfikujemy, aby odczytywać wartości z obiektów
  const values = data.map((d) => d.value);
  const maxValue = Math.max(...values);

  const getPath = (d, close = false) => {
    let path = `M ${padding} ${chartHeight - padding}`;
    d.forEach((point, i) => {
      const x = padding + (i / (d.length - 1)) * (chartWidth - padding * 2);
      const y =
        chartHeight -
        padding -
        (point.value / maxValue) * (chartHeight - padding * 2);
      path += ` L ${x} ${y}`;
    });
    if (close) path += ` L ${chartWidth - padding} ${chartHeight - padding} Z`;
    return path;
  };

  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const index = Math.round(
      ((svgP.x - padding) / (chartWidth - padding * 2)) * (data.length - 1)
    );

    if (index >= 0 && index < data.length) {
      const point = data[index];
      const x =
        padding + (index / (data.length - 1)) * (chartWidth - padding * 2);
      const y =
        chartHeight -
        padding -
        (point.value / maxValue) * (chartHeight - padding * 2);
      setTooltip({ x, y, value: point.value, timestamp: point.timestamp });
    }
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
        className="w-full h-auto"
      >
        {/* Definicje gradientu i filtra */}
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

        {/* Linia i obszar wykresu */}
        <motion.path
          d={getPath(data)}
          fill="none"
          stroke="#8A2BE2"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          filter="url(#glow)"
        />
        <motion.path
          d={getPath(data, true)}
          fill="url(#energyGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* 2. Dodajemy etykiety na osi X */}
        {data.map((point, i) => {
          // Pokaż co n-tą etykietę, aby uniknąć tłoku
          if (i % Math.ceil(data.length / 7) !== 0) return null;
          const x =
            padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
          return (
            <text
              key={i}
              x={x}
              y={chartHeight - padding + 20}
              textAnchor="middle"
              fill="white"
              fontSize="10"
              opacity="0.5"
            >
              {format(
                point.timestamp,
                timeFormat === "time" ? "HH:00" : "d.MM"
              )}
            </text>
          );
        })}

        {tooltip && (
          <g>
            <line
              x1={tooltip.x}
              y1={padding}
              x2={tooltip.x}
              y2={chartHeight - padding}
              stroke="white"
              strokeDasharray="4 4"
              strokeOpacity="0.5"
            />
            <circle
              cx={tooltip.x}
              cy={tooltip.y}
              r="5"
              fill="#8A2BE2"
              stroke="white"
              strokeWidth="2"
            />
            <g>
              <rect
                x={tooltip.x + 10}
                y={tooltip.y - 40}
                width="85"
                height="40"
                rx="5"
                fill="black"
                fillOpacity="0.7"
              />
              <text
                x={tooltip.x + 18}
                y={tooltip.y - 22}
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {tooltip.value.toFixed(1)} {unit}
              </text>
              <text
                x={tooltip.x + 18}
                y={tooltip.y - 5}
                fill="gray"
                fontSize="10"
              >
                {format(tooltip.timestamp, "d MMM, HH:mm")}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

export default InteractiveChart;
