export const initialHomeState = {
  notifications: [],
  thermostat: {
    temperature: 12.5,
    target: 22,
    unit: "°C",
    status: "heating",
  },
  lighting: {
    livingRoom: {
      id: "livingRoom",
      name: "Living Room",
      isOn: true,
      brightness: 80,
      color: "hsl(40, 100%, 75%)",
    }, // ciepły biały
    kitchen: {
      id: "kitchen",
      name: "Kitchen",
      isOn: true,
      brightness: 65,
      color: "hsl(200, 100%, 85%)",
    }, // chłodny biały
    bedroom: {
      id: "bedroom",
      name: "Bedroom",
      isOn: false,
      brightness: 100,
      color: "hsl(300, 80%, 70%)",
    }, // fioletowy
    office: {
      id: "office",
      name: "Office",
      isOn: true,
      brightness: 90,
      color: "hsl(180, 70%, 80%)",
    }, // turkusowy
  },
  energy: {
    usageNow: 1.2,
    usageToday: 8.4,
    unit: "kWh", // Zmieniamy na kWh, bo mówimy o zużyciu, nie mocy chwilowej
    history: [], // Ta historia jest teraz mniej ważna
    // NOWE DANE HISTORYCZNE
    // dailyHistory: generateHistoricalData(24, "hours", 0.5, 0.3),
    // weeklyHistory: generateHistoricalData(7, "days", 12, 4),
    // monthlyHistory: generateHistoricalData(30, "days", 12, 4),
  },
  environment: {
    location: "Krakow, PL",
    weather: {
      condition: "sunny", // 'sunny', 'cloudy', 'rainy', 'stormy', 'snowy'
      temperature: 19,
      windSpeed: 15, // km/h
      humidity: 65, // %
      unit: "°C",
    },
    airQuality: {
      index: 45, // Symulacja indeksu AQI
      level: "Good", // 'Dobra', 'Umiarkowana', 'Zła'
    },
    sun: {
      sunrise: "05:32",
      sunset: "20:48",
    },
  },
  security: {
    status: "disarmed", // 'armed_away', 'armed_home', 'disarmed'
    sensors: [
      {
        id: "front_door",
        name: "Front Door",
        isTriggered: false,
        type: "door",
      },
      {
        id: "living_room_motion",
        name: "Motion (Living Room)",
        isTriggered: false,
        type: "motion",
      },
      {
        id: "cam_garage",
        name: "Camera (Garage)",
        isTriggered: false,
        type: "camera",
      },
      {
        id: "cam_garden",
        name: "Camera (Gardern)",
        isTriggered: false,
        type: "camera",
      },
    ],
    eventLog: [],
  },
};
