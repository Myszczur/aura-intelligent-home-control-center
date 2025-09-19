/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import {
//   motion,
//   useMotionValue,
//   useMotionValueEvent,
//   useTransform,
// } from "framer-motion";
// import { useHome } from "../context/HomeEngineContext";
// import { Thermometer, Zap } from "lucide-react";

// export const ThermostatWidget = () => {
//   const { homeState, setTargetTemperature } = useHome();
//   const { temperature, target, status } = homeState.thermostat;

//   const rotate = useMotionValue(0);

//   const targetTemperature = useTransform(rotate, [-135, 135], [18, 26]);
//   // const newTarget = useTransform(x, [-100, 100], [18, 26]);
//   // const newTarget = useTransform(x, [-100, 100], [18, 26], { clamp: false });

//   // useMotionValueEvent(newTarget, "change", (latest) => {
//   //   const roundedValue = Math.round(latest * 2) / 2;
//   //   setTargetTemperature(roundedValue);
//   // });

//   //   return (
//   //     <div className="bg-gradient-to-br from-[#2c2c2c] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5 flex flex-col">
//   //       <div className="flex justify-between items-start mb-4">
//   //         <div>
//   //           <h3 className="font-bold text-white">Termostat</h3>
//   //           <p className="text-sm text-gray-400">Salon</p>
//   //         </div>
//   //         <Thermometer className="text-gray-500" />
//   //       </div>

//   //       {/* "Pokrętło" - centralny element */}
//   //       <div className="relative flex-grow flex items-center justify-center my-4">
//   //         {/* Tło pokrętła z wewnętrznym cieniem, by wyglądało jak wklęsłe */}
//   //         <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#111111] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5),_0_1px_0_0_rgba(255,255,255,0.03)] flex items-center justify-center">
//   //           {/* Tekst wewnątrz */}
//   //           <div className="text-center">
//   //             <p className="text-5xl font-light text-white">
//   //               {temperature.toFixed(1)}°
//   //             </p>
//   //             <p
//   //               className={`text-sm ${
//   //                 status === "heating" ? "text-[#8A2BE2]" : "text-gray-500"
//   //               }`}
//   //             >
//   //               Cel: {target.toFixed(1)}°
//   //             </p>
//   //           </div>
//   //         </div>

//   //         {/* Interaktywny uchwyt pokrętła */}
//   //         <motion.div
//   //           className="absolute w-full h-full"
//   //           style={{ rotate: rotation }}
//   //         >
//   //           <motion.div
//   //             className="absolute top-[-5px] left-1/2 -ml-3 w-6 h-6 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center"
//   //             drag="x" // Umożliwia przeciąganie tylko w osi X
//   //             dragConstraints={{ left: -100, right: 100 }} // Ograniczenia przeciągania
//   //             style={{ x }} // Przypisujemy pozycję do `x`
//   //             // onDrag={() => {
//   //             //   setTargetTemperature(newTarget.get());
//   //             // }}
//   //           >
//   //             {/* Wygląd uchwytu */}
//   //             <div className="w-3 h-3 rounded-full bg-[#8A2BE2] shadow-lg" />
//   //           </motion.div>
//   //         </motion.div>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   return (
//     <div className="bg-gradient-to-br from-[#2c2c2c'] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5 flex flex-col h-full">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="font-bold text-white">Termostat</h3>
//           <p className="text-sm text-gray-400">Salon</p>
//         </div>
//         <Thermometer className="text-gray-500" />
//       </div>

//       <div className="relative flex-grow flex items-center justify-center my-4">
//         {/* Niewidzialne, ale przeciągalne pokrętło */}
//         <motion.div
//           className="w-56 h-56 rounded-full cursor-grab active:cursor-grabbing"
//           drag
//           dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
//           dragMomentum={false}
//           // 3. To jest kluczowe: na przeciąganie, obracamy element sam do siebie i aktualizujemy stan
//           onPan={(event, info) => {
//             const newRotation = rotate.get() + info.delta.x; // Prosta zmiana obrotu
//             rotate.set(newRotation);

//             // Aktualizujemy temperaturę w stanie globalnym
//             const newTemp = Math.round(targetTemperature.get() * 2) / 2;
//             setTargetTemperature(newTemp);
//           }}
//           style={{ rotate }} // Bindowanie rotacji do stylu
//         >
//           {/* Wizualne tło pokrętła - jest teraz dzieckiem przeciąganego elementu */}
//           <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#111111] shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)\,_0_1px_0_0_rgba(255,255,255,0.03)] flex items-center justify-center">
//             <div className="text-center">
//               <p className="text-5xl font-light text-white">
//                 {temperature.toFixed(1)}°
//               </p>
//               <p
//                 className={`text-sm ${
//                   status === "heating" ? "text-[#8A2BE2]" : "text-gray-500"
//                 }`}
//               >
//                 Cel: {target.toFixed(1)}°
//               </p>
//             </div>
//           </div>

//           {/* 4. Kulka jest teraz tylko wizualnym wskaźnikiem, NIE jest przeciągana! */}
//           <div className="absolute top-[-5px] left-1/2 -ml-3 w-6 h-6 rounded-full flex items-center justify-center">
//             <div className="w-3 h-3 rounded-full bg-[#8A2BE2] shadow-lg" />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHome } from "../context/HomeEngineContext";
import { Thermometer, Minus, Plus } from "lucide-react";

const ThermostatWidget = () => {
  const { homeState, setTargetTemperature } = useHome();

  if (!homeState.thermostat) {
    return <div>Ładowanie termostatu...</div>;
  }

  const { temperature, target, status } = homeState.thermostat;

  const tempToPercentage = (temp) => ((temp - 18) / (26 - 18)) * 100;

  const handleSliderChange = (event) => {
    setTargetTemperature(parseFloat(event.target.value));
  };

  return (
    <div className="bg-gradient-to-br from-[#2c2c2c] to-[#252525] p-6 rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-white">Termostat</h3>
          <p className="text-sm text-gray-400">Salon</p>
        </div>
        <Thermometer className="text-gray-500" />
      </div>

      {/* Centralny wskaźnik temperatury */}
      <div className="flex-grow flex items-center justify-center my-4">
        <div className="text-center">
          <p className="text-6xl md:text-7xl font-light text-white tracking-tighter">
            {temperature.toFixed(1)}°
          </p>

          <div
            className={`text-sm flex justify-center items-center space-x-1 ${
              status === "heating" ? "text-[#8A2BE2]" : "text-gray-500"
            }`}
          >
            <span>Ustawiono:</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={target}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="font-semibold"
              >
                {target.toFixed(1)}°
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
          <Minus className="w-4 h-4" />
          <span className="font-semibold text-white">Temperatura Docelowa</span>
          <Plus className="w-4 h-4" />
        </div>
        <div className="relative h-10 flex items-center group">
          {" "}
          {/* Dodajemy `group` dla hover */}
          <div className="absolute w-full h-2 bg-black/30 rounded-full shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)\,_0_1px_0_0_rgba(255,255,255,0.03)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#007BFF] to-[#8A2BE2] rounded-full"
              style={{ width: `${tempToPercentage(target)}%` }}
            />
          </div>
          <motion.div
            className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-2 border-white/50"
            style={{ left: `calc(${tempToPercentage(target)}% - 10px)` }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <input
            type="range"
            min="18"
            max="26"
            step="0.5"
            value={target}
            onChange={handleSliderChange}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex justify-between items-center text-gray-500 text-xs mt-1">
          <span>18°</span>
          <span>26°</span>
        </div>
      </div>
    </div>
  );
};

export default ThermostatWidget;
