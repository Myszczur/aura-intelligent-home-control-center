/* eslint-disable no-unused-vars */
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAllSounds } from "./hooks/useSound";

// Komponenty główne
import SideBar from "./components/SideBar";
import NotificationManager from "./components/NotificationManager";
import Loader from "./components/Loader";

// Widoki (Views)
const DashboardView = lazy(() => import("./views/DashboardView"));
const LightingView = lazy(() => import("./views/LightingView"));
const SecurityView = lazy(() => import("./views/SecurityView"));
const StatsView = lazy(() => import("./views/StatsView"));

// import DashboardView from "./views/DashboardView";
// import LightingView from "./views/LightingView";
// import SecurityView from "./views/SecurityView";
// import StatsView from "./views/StatsView";
import { useEffect } from "react";

// ---- Główny Komponent Aplikacji ----
function App() {
  const location = useLocation();

  useEffect(() => {
    preloadAllSounds();
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 0.8,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.2,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  return (
    <main className="bg-gradient-to-br from-[#1a1a1a] to-[#111111] min-h-screen text-gray-200 flex overflow-hidden">
      <SideBar />
      <div className="flex-1 p-6 md:p-8 flex flex-col relative">
        <header className="mb-8 shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            AURA Control Center
          </h1>
          <p className="text-gray-400 mt-1">
            Witaj z powrotem, tu znajdziesz wszystko, czego potrzebujesz.
          </p>
        </header>

        <div className="flex-grow overflow-y-auto pr-4 -mr-4 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="absolute w-full"
            >
              <Suspense fallback={<Loader />}>
                <Routes location={location}>
                  <Route path="/" element={<DashboardView />} />
                  <Route path="/lighting" element={<LightingView />} />
                  <Route path="/security" element={<SecurityView />} />
                  <Route path="/stats" element={<StatsView />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <NotificationManager />
    </main>
  );
}

export default App;
