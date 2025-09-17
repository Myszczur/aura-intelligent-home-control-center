import SideBar from "./components/SideBar.jsx";
import ThermostatWidget from "./components/ThermostatWidget";
import QuickActionsWidget from "./components/QuickActionsWidget";

function App() {
  return (
    <main className="bg-gradient-to-br from-[#1a1a1a] to-[#111111] min-h-screen text-gray-200 flex">
      <SideBar />

      {/* Główny kontener na widgety */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          AURA Control Center
        </h1>

        {/* Siatka na widgety */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThermostatWidget />
          <QuickActionsWidget />
        </div>
      </div>
    </main>
  );
}

export default App;
