/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { useCurrentTime } from "../hooks/useCurrentTime";
import {
  Sun,
  Cloud,
  CloudLightning,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
} from "lucide-react";

// Słownik polskich nazw pogody
const weatherConditionMap = {
  sunny: "Słonecznie",
  cloudy: "Pochmurno",
  rainy: "Deszczowo",
  stormy: "Burzowo",
  snowy: "Śnieg",
};

// Rozbudowany komponent ikony pogody
const WeatherIcon = ({ condition }) => {
  const icons = {
    sunny: (
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Sun className="w-16 h-16 text-yellow-400" />
      </motion.div>
    ),
    cloudy: (
      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud className="w-16 h-16 text-gray-400" />
      </motion.div>
    ),
    rainy: (
      <div className="relative w-16 h-16">
        {/* 1. Ikona Chmury - jest tłem dla deszczu */}
        <Cloud className="absolute top-0 left-0 w-full h-full text-gray-500" />

        {/* 2. Kontener na krople deszczu - generujemy kilka kropli */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-3 bg-blue-400 rounded-full"
            style={{ left: `${20 + i * 25}%` }} // Pozycjonowanie kropli horyzontalnie
            // Animacja kropli
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: [10, 50], // Animacja spadania
              opacity: [1, 0], // Animacja znikania
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity, // Kluczowe: animacja powtarza się w nieskończoność
              delay: i * 0.3, // Kluczowe: każda kropla startuje z opóźnieniem
              ease: "linear",
            }}
          />
        ))}
      </div>
    ),
    stormy: (
      <motion.div
        className="relative"
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cloud className="w-16 h-16 text-gray-600" />
        <motion.div
          className="absolute top-3/4 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        >
          <CloudLightning className="w-8 h-8 text-yellow-300" />
        </motion.div>
      </motion.div>
    ),
    snowy: (
      <div className="relative">
        <Cloud className="w-16 h-16 text-gray-400" />
        {/* Animowane płatki śniegu */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200"
            style={{ left: `${10 + i * 20}%` }}
            initial={{ y: -10, opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ y: [0, 50], x: [0, i % 2 === 0 ? -5 : 5, 0] }} // Delikatny dryf
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
          >
            ❄️
          </motion.div>
        ))}
      </div>
    ),
  };
  // Kopia animacji dla deszczu (była dobra)
  icons.rainy = (
    <div className="relative">
      <Cloud className="w-16 h-16 text-gray-500" />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-3 bg-blue-400 rounded-full"
          style={{ left: `${20 + i * 25}%` }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [0, 40], opacity: [1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );

  return icons[condition] || icons.cloudy;
};

const EnvironmentWidget = () => {
  const { homeState } = useHome();
  const { location, weather, airQuality, sun } = homeState.environment;
  const currentTime = useCurrentTime();

  const getAqiColor = (index) => {
    if (index <= 50) return "text-green-400";
    if (index <= 100) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className=" bg-gradient-to-br from-[#2c2c2c] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border-3 border-white/4 flex flex-col justify-between h-full lg:col-span-2 xl:col-span-1">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">{location}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-mono font-semibold text-white">
              {currentTime.substring(0, 5)}
            </span>{" "}
            {/* Godziny i minuty */}
            <span className="text-sm font-mono text-gray-400 animate-pulse">
              {currentTime.substring(5)}
            </span>{" "}
            {/* Sekundy z animacją */}
          </div>

          <span
            className={`text-sm font-bold ${getAqiColor(airQuality.index)}`}
          >
            AQI: {airQuality.index}
          </span>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div className="flex items-center justify-center h-20">
            <WeatherIcon condition={weather.condition} />
          </div>
          <div>
            <p className="text-5xl font-light text-white text-center">
              {weather.temperature}°
            </p>
            <p className="text-gray-400 capitalize text-center">
              {weatherConditionMap[weather.condition] || "Brak danych"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Wiatr</p>
              <p className="font-semibold text-white">
                {weather.windSpeed} km/h
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-400">Wilgotność</p>
              <p className="font-semibold text-white">{weather.humidity}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informacje o słońcu na samym dole */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <Sunrise className="w-5 h-5 text-yellow-300" />
          <span className="text-sm text-gray-300">{sun.sunrise}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Sunset className="w-5 h-5 text-orange-400" />
          <span className="text-sm text-gray-300">{sun.sunset}</span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentWidget;
