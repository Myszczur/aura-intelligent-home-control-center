// import SideBar from "./components/SideBar.jsx";
// import { ThermostatWidget } from "./components/ThermostatWidget";
// import QuickActionsWidget from "./components/QuickActionsWidget";
// import EnergyUsageWidget from "./components/EnergyUsageWidget.jsx";
// import SecurityWidget from "./components/SecurityWidget.jsx";
// import LightingWidget from "./components/LightingWidget.jsx";
// import { EnvironmentWidget } from "./components/EnvironmentWidget.jsx";

// function App() {
//   return (
//     <main
//       className="min-h-screen text-gray-200 flex
//                  bg-gradient-to-br from-[#1a1a1a] to-[#111111]
//                  relative"
//     >
//       <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-30 pointer-events-none" />
//       <SideBar />

//       {/* Główny kontener na widgety */}
//       <div className="flex-1 p-8">
//         <header className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white">
//             AURA Control Center
//           </h1>
//           <p className="text-gray-400 mt-1">
//             Witaj z powrotem, tu znajdziesz wszystko, czego potrzebujesz.
//           </p>
//         </header>

//         {/* Siatka na widgety */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           <EnvironmentWidget />
//           <EnergyUsageWidget />
//           <ThermostatWidget />
//           <EnvironmentWidget />
//           <LightingWidget />
//           <div className="bg-gradient-to-br from-dark-card-start to-dark-card rounded-2xl shadow-tactile border border-white/5">
//             <QuickActionsWidget />
//           </div>
//           <SecurityWidget />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;

// Importy komponentów głównych
import { SideBar } from "./components/SideBar";

// Importy wszystkich naszych widgetów
import EnergyUsageWidget from "./components/EnergyUsageWidget";
import { ThermostatWidget } from "./components/ThermostatWidget";
import LightingWidget from "./components/LightingWidget";
import QuickActionsWidget from "./components/QuickActionsWidget";
import { SecurityWidget } from "./components/SecurityWidget";
import { EnvironmentWidget } from "./components/EnvironmentWidget";

// ---- Główny Komponent Aplikacji ----
function App() {
  return (
    <main
      className="min-h-screen text-gray-200 flex
                  bg-gradient-to-br from-[#1a1a1a] to-[#111111]
                  relative"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-30 pointer-events-none" />
      <SideBar />

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            AURA Control Center
          </h1>
          <p className="text-gray-400 mt-1">
            Witaj z powrotem, tu znajdziesz wszystko, czego potrzebujesz.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Widget Pogody - zajmuje 2 kolumny na md i większych */}
          <div className="md:col-span-2 lg:col-span-2">
            <EnvironmentWidget />
          </div>

          {/* Szybkie Akcje */}
          <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-dark-card-start to-dark-card rounded-2xl shadow-tactile border border-white/5">
            <QuickActionsWidget />
          </div>

          {/* Widget Energii - zajmuje 2 kolumny na md i większych */}
          <div className="md:col-span-2 lg:col-span-2">
            <EnergyUsageWidget />
          </div>

          {/* Termostat */}
          <div className="lg:col-span-1">
            <ThermostatWidget />
          </div>

          {/* Oświetlenie */}
          <div className="lg:col-span-1">
            <LightingWidget />
          </div>

          {/* Bezpieczeństwo */}
          <div className="lg:col-span-1">
            <SecurityWidget />
          </div>

          {/* Tutaj możesz dodawać kolejne widgety, siatka je ułoży */}
        </div>
      </div>
    </main>
  );
}

export default App;
