import EnergyUsageWidget from "../components/EnergyUsageWidget";
import ThermostatWidget from "../components/ThermostatWidget";
import LightingWidget from "../components/LightingWidget";
import QuickActionsWidget from "../components/QuickActionsWidget";
import SecurityWidget from "../components/SecurityWidget";
import EnvironmentWidget from "../components/EnvironmentWidget";
import SuggestionWidget from "../components/SuggestionWidget";

function DashboardView() {
  return (
    <>
      <SuggestionWidget />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-2">
          <EnvironmentWidget />
        </div>
        <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-[#2c2c2c] to-[#252525] rounded-2xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)\,_inset_0_1px_0_0_rgba(255,255,255,0.05)] border border-white/5">
          <QuickActionsWidget />
        </div>
        <div className="md:col-span-2 lg:col-span-2">
          <EnergyUsageWidget />
        </div>
        <div className="lg:col-span-1">
          <ThermostatWidget />
        </div>
        <div className="lg:col-span-1">
          <LightingWidget />
        </div>
        <div className="lg:col-span-1">
          <SecurityWidget />
        </div>
      </div>
    </>
  );
}

export default DashboardView;
