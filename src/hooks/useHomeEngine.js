/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { initialHomeState } from "../core/initialHomeState";

export const useHomeEngine = () => {
  const [homeState, setHomeState] = useState(initialHomeState);

  //główna pętla do symulacji domu
  useEffect(() => {
    const symulationInterval = setInterval(() => {
      setHomeState((prevState) => {
        // termostat
        const tempDiff =
          prevState.thermostat.target - prevState.thermostat.temperature;
        let tempChange = 0;
        if (Math.abs(tempDiff) > 0.1) {
          tempChange = tempDiff * 0.05;
        }
        const randomFluctuation = (Math.random() - 0.5) * 0.1;
        const newTemperature = parseFloat(
          (
            prevState.thermostat.temperature +
            tempChange +
            randomFluctuation
          ).toFixed(2)
        );

        // symulacja oświetlenia i zuzycia energii
        let activeLights = 0;
        let brightnessSum = 0;
        Object.values(prevState.lighting).forEach((light) => {
          if (light.isOn) {
            activeLights++;
            brightnessSum += light.brightness;
          }
        });

        // Nowe zużycie energii = bazowe zużycie + zużycie przez światła
        const baseUsage = 0.2;
        const lightsUsage = (brightnessSum / 100) * 0.15;
        const newEnergyUsageNow = parseFloat(
          (baseUsage + lightsUsage + (Math.random() - 0.5) * 0.5).toFixed(2)
        );
        const newEnergyUsageToday = parseFloat(
          (prevState.energy.usageToday + newEnergyUsageNow / 3600).toFixed(4)
        );

        // Losowe wyzwolenie czujnika ruchu co jakiś czas
        let newSensors = prevState.security.sensors;
        if (Math.random() < 0.02) {
          const sensorIndex = Math.floor(Math.random() * newSensors.length);
          // Symulujmy, że czujnik jest aktywny przez chwilę
          newSensors = newSensors.map((sensor, index) =>
            index === sensorIndex
              ? { ...sensor, isTriggered: true }
              : { ...sensor, isTriggered: false }
          );
        } else {
          newSensors = newSensors.map((sensor) => ({
            ...sensor,
            isTriggered: false,
          }));
        }

        // Zwracamy zaktualizowany stan
        return {
          ...prevState,
          thermostat: {
            ...prevState.thermostat,
            temperature: newTemperature,
            status: tempDiff > 0 ? "heating" : "off",
          },
          energy: {
            ...prevState.energy,
            usageNow: newEnergyUsageNow,
            usageToday: newEnergyUsageToday,
          },
          security: {
            ...prevState.security,
            sensors: newSensors,
          },
        };
      });
    }, 2000);

    return () => setInterval(symulationInterval);
  }, []);

  // --- FUNKCJE DO KONTROLI DOMU (dla UI) ---
  const setTargetTemperature = useCallback((temp) => {
    setHomeState((prevState) => ({
      ...prevState,
      thermostat: { ...prevState.thermostat, target: temp },
    }));
  }, []);

  const toggleLight = useCallback((lightId) => {
    setHomeState((prevState) => ({
      ...prevState,
      lighting: {
        ...prevState.lighting,
        [lightId]: {
          ...prevState.lighting[lightId],
          isOn: !prevState.lighting[lightId].isOn,
        },
      },
    }));
  }, []);

  const setLightBrightness = useCallback((lightId, brightness) => {
    setHomeState((prevState) => ({
      ...prevState,
      lighting: {
        ...prevState.lighting,
        [lightId]: {
          ...prevState.lighting[lightId],
          brightness: Number(brightness),
        },
      },
    }));
  }, []);

  const setSecurityStatus = useCallback((securityStatus) => {
    setHomeState((prevState) => ({
      ...prevState.security,
      security: {
        ...prevState.security,
        status: securityStatus,
      },
    }));
  }, []);

  return {
    homeState,
    setTargetTemperature,
    setLightBrightness,
    setSecurityStatus,
    toggleLight,
  };
}
