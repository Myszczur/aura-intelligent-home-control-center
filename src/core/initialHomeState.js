export const initialHomeState = {
  // termostat i temeratura
  thermostat: {
    temperature: 21.5, // aktualna temperatura
    target: 23, // docelowa temperatura ustawiona przez użytkownika
    unit: "°C",
    status: "heating",
  },

  // oświetlenie
  lighting: {
    livingRoom: {
      id: "livingRoom",
      name: "Salon",
      isOn: true,
      brightness: 80,
    },
    kitchen: {
      id: "kitchen",
      name: "Kuchnia",
      isOn: true,
      brightness: 65,
    },
    bedroom: {
      id: "bedroom",
      name: "Sypialnia",
      isOn: false,
      brightness: 100,
    },
    office: {
      id: "office",
      name: "Biuro",
      isOn: true,
      brightness: 90,
    },
  },

  // zużycie energii
  energy: {
    usageNow: 1.2,
    usageToday: 8.4,
    unit: "kw",
  },

  // systemy bezpieczeństwa
  security: {
    status: "disarmed",
    sensors: [
      {
        id: "front_door",
        name: "Drzwi frontowe",
        isTriggered: false,
      },
      {
        id: "back_door",
        name: "Drzwi tylne",
        isTriggered: false,
      },
      {
        id: "living_room_motion",
        name: "Czujnik ruchu (Salon)",
        isTriggered: false,
      },
    ],
  },
};
