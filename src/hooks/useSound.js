/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";

const sounds = {
  click: "/sounds/click.mp3",
  toggle: "/sounds/toggle.mp3",
  notification: "/sounds/notification.mp3",
  hover: "/sounds/hover.mp3",
};

const audioCache = {};

export const useSound = (initialVolume = 0.5) => {
  const [areSoundsEnabled, setSoundsEnabled] = useState(() => {
    const saved = localStorage.getItem("soundsEnabled");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [volume, setVolume] = useState(initialVolume);

  const toggleSounds = () => {
    const newState = !areSoundsEnabled;
    setSoundsEnabled(newState);
    localStorage.setItem("soundsEnabled", JSON.stringify(newState));
  };

  const playSound = useCallback(
    (soundName) => {
      if (!areSoundsEnabled || !sounds[soundName]) return;

      try {
        let audio = audioCache[soundName];
        if (!audio) {
          audio = new Audio(sounds[soundName]);
          audioCache[soundName] = audio;
        }

        audio.volume = volume;

        audio.currentTime = 0;
        audio.play().catch((error) => {
          console.error(`Could not play sound: ${soundName}`, error);
        });
      } catch (error) {
        console.error(`Error with audio playback for: ${soundName}`, error);
      }
    },
    [areSoundsEnabled, volume]
  );

  return { areSoundsEnabled, toggleSounds, playSound };
};
