/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { initialHomeState } from "../core/initialHomeState";
import { v4 as uuidv4 } from "uuid";
import { color } from "motion";

export const useHomeEngine = () => {
  const [homeState, setHomeState] = useState(initialHomeState);

  const logSecurityEvent = (message, level = "info") => {
    const newLogEntry = {
      id: uuidv4(),
      timestamp: new Date(),
      message,
      level,
    };

    setHomeState((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        eventLog: [newLogEntry, ...prev.security.eventLog].slice(0, 10),
      },
    }));
  };

  //główna pętla do symulacji domu
  useEffect(() => {
    const symulationInterval = setInterval(() => {
      setHomeState((prevState) => {
        let newState = { ...prevState };

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
        const newHistory = [...prevState.energy.history, newEnergyUsageNow];
        if (newHistory.length > 30) {
          newHistory.shift();
        }

        // Losowe wyzwolenie czujnika ruchu co jakiś czas
        let newSensors = prevState.security.sensors.map((s) => ({
          ...s,
          isTriggered: false,
        }));
        if (prevState.security.status !== "disarmed" && Math.random() < 0.05) {
          const triggerableSensors = prevState.security.sensors;
          const sensorIndex = Math.floor(
            Math.random() * triggerableSensors.length
          );
          const triggeredSensor = triggerableSensors[sensorIndex];

          newSensors = prevState.security.sensors.map((s, i) =>
            i === sensorIndex ? { ...s, isTriggered: true } : s
          );
          logSecurityEvent(`Wykryto ruch: ${triggeredSensor.name}`, "alert");
        }

        // if (Math.random() < 0.02) {
        //   const sensorIndex = Math.floor(Math.random() * newSensors.length);
        //   // Symulujmy, że czujnik jest aktywny przez chwilę
        //   newSensors = newSensors.map((sensor, index) =>
        //     index === sensorIndex
        //       ? { ...sensor, isTriggered: true }
        //       : { ...sensor, isTriggered: false }
        //   );
        // } else {
        //   newSensors = newSensors.map((sensor) => ({
        //     ...sensor,
        //     isTriggered: false,
        //   }));
        // }

        // --- Symulacja zmiany pogody co jakiś czas ---
        if (Math.random() < 0.01) {
          // 1% szansy
          const conditions = ["sunny", "cloudy", "rainy", "stormy", "snowy"];
          const newCondition =
            conditions[Math.floor(Math.random() * conditions.length)];
          newState.environment.weather.condition = newCondition;

          if (newCondition === "sunny") {
            newState.environment.weather = {
              ...newState.environment.weather,
              temperature: 24,
              windSpeed: 10,
              humidity: 50,
            };
          }
          if (newCondition === "cloudy") {
            newState.environment.weather = {
              ...newState.environment.weather,
              temperature: 18,
              windSpeed: 15,
              humidity: 65,
            };
          }
          if (newCondition === "rainy") {
            newState.environment.weather = {
              ...newState.environment.weather,
              temperature: 15,
              windSpeed: 25,
              humidity: 85,
            };
          }
          if (newCondition === "stormy") {
            newState.environment.weather = {
              ...newState.environment.weather,
              temperature: 16,
              windSpeed: 45,
              humidity: 90,
            };
          }
          if (newCondition === "snowy") {
            newState.environment.weather = {
              ...newState.environment.weather,
              temperature: -2,
              windSpeed: 20,
              humidity: 80,
            };
          }
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
            history: newHistory,
          },
          security: {
            ...prevState.security,
            sensors: newSensors,
          },
          newState,
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

  const setAllLights = useCallback((state) => {
    setHomeState((prev) => {
      const newLightingState = { ...prev.lighting };
      Object.keys(newLightingState).forEach((lightId) => {
        newLightingState[lightId].isOn = state;
      });
      return { ...prev, lighting: newLightingState };
    });
  }, []);

  const addNotification = useCallback((message, type = "info") => {
    const newNotification = {
      id: uuidv4(),
      message,
      type,
    };

    setHomeState((prevState) => ({
      ...prevState,
      notifications: [...prevState.notifications, newNotification],
    }));

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setHomeState((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id),
    }));
  }, []);

  const setScene = useCallback(
    (sceneName) => {
      setHomeState((prev) => {
        let newState = { ...prev };

        if (sceneName === "movieNight") {
          // Przyciemnij światła w salonie i kuchni, wyłącz w biurze
          newState.lighting.livingRoom = {
            ...newState.lighting.livingRoom,
            isOn: true,
            brightness: 30,
          };
          newState.lighting.kitchen = {
            ...newState.lighting.kitchen,
            isOn: true,
            brightness: 20,
          };
          newState.lighting.office = {
            ...newState.lighting.office,
            isOn: false,
          };

          // Ustaw komfortową temperaturę do oglądania
          newState.thermostat.target = 21;
        }

        if (sceneName === "goodbye") {
          // Wyłącz wszystkie światła
          Object.keys(newState.lighting).forEach((lightId) => {
            newState.lighting[lightId].isOn = false;
          });

          // Ustaw alarm
          newState.security.status = "armed_away";
        }

        if (sceneName === "movieNight") {
          addNotification("“Movie Night” scene is active.", "info");
        }
        if (sceneName === "goodbye") {
          addNotification(
            "See you! The “Exit” scene has been activated.",
            "info"
          );
        }

        return newState;
      });
    },
    [addNotification]
  );

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

  const setSecurityStatus = useCallback(
    (status) => {
      const statusMap = {
        armed_away: "Uystem Armed (Away)",
        armed_home: "System Armed (at Home)",
        disarmed: "Disarmed",
      };
      logSecurityEvent(`System switched to mode: ${statusMap[status]}`);
      addNotification(`Security System ${statusMap[status]}.`, "success");

      setHomeState((prev) => ({
        ...prev,
        security: { ...prev.security, status },
      }));
    },
    [addNotification]
  );

  const setLightColor = useCallback((lightId, newColor) => {
    setHomeState((prevState) => ({
      ...prevState,
      lighting: {
        ...prevState.lighting,
        [lightId]: { ...prevState.lighting[lightId], color: newColor },
      },
    }));
  }, []);

  return {
    homeState,
    setTargetTemperature,
    setLightBrightness,
    setSecurityStatus,
    toggleLight,
    setAllLights,
    setScene,
    removeNotification,
    setLightColor,
  };
};
