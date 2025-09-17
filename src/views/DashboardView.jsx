import React from "react";
import EnergyUsageWidget from "../components/EnergyUsageWidget";
import ThermostatWidget from "../components/ThermostatWidget";
import LightingWidget from "../components/LightingWidget";
import QuickActionsWidget from "../components/QuickActionsWidget";
import SecurityWidget from "../components/SecurityWidget";
import EnvironmentWidget from "../components/EnvironmentWidget";

function DashboardView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="md:col-span-2 lg:col-span-2">
        <EnvironmentWidget />
      </div>
      <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-dark-card-start to-dark-card rounded-2xl shadow-tactile border border-white/5">
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
  );
}

export default DashboardView;
