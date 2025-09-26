/* eslint-disable no-unused-vars */
import { fi } from "date-fns/locale";
import { useCallback, useRef, useState } from "react";

export const sounds = {
  click: "/sounds/click.mp3",
  toggle: "/sounds/toggle.mp3",
  notification: "/sounds/notification.mp3",
  hover: "/sounds/hover.mp3",
};

const audioCache = {};
const initializeAudioCache = () => {
  Object.keys(sounds).forEach((key) => {
    if (!audioCache) {
      const audio = new Audio(sounds[key]);
      audio.load();
      audioCache[key] = audio;
    }
  });
};
initializeAudioCache();

export const useSound = (initialVolume = 0.5) => {
  const [areSoundsEnabled, setSoundsEnabled] = useState(() => {
    const saved = localStorage.getItem("soundsEnabled");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [volume, setVolume] = useState(initialVolume);

  const hoverSoundTimeout = useRef(null);

  const toggleSounds = () => {
    const newState = !areSoundsEnabled;
    setSoundsEnabled(newState);
    localStorage.setItem("soundsEnabled", JSON.stringify(newState));
  };

  const playSound = useCallback(
    (soundName, options = {}) => {
      if (!areSoundsEnabled || !sounds[soundName]) return;

      if (options.isHover) {
        if (hoverSoundTimeout.current) return;
        hoverSoundTimeout.current = setTimeout(() => {
          hoverSoundTimeout.current = null;
        }, 150);
      }

      try {
        let audio = audioCache[soundName];
        if (!audio) {
          console.log(`First use: Caching and loading sound '${soundName}'...`);
          audio = new Audio(sounds[soundName]);
          audio.load();
          audioCache[soundName] = audio;
        }

        audio.volume = volume;

        const playPromise = () => {
          if (audio.paused) {
            audio.currentTime = 0;
            audio.play().catch((error) => {
              console.warn(`Audio play failed for ${soundName}:`, error);
            });
          } else {
            audio.pause();
            audio.currentTime = 0;
            audio.play().catch((error) => {
              console.warn(`Audio restart failed for ${soundName}:`, error);
            });
          }
        };

        if (audio.readyState >= 2) {
          playPromise();
        } else {
          audio.addEventListener("canplaythrough", playPromise, { once: true });
        }
      } catch (error) {
        console.error(`Error with audio playback for: ${soundName}`, error);
      }
    },
    [areSoundsEnabled, volume]
  );

  return { areSoundsEnabled, toggleSounds, playSound };
};

export const preloadAllSounds = () => {
  console.log("Preloading Sounds...");
  Object.keys(sounds).forEach((key) => {
    if (!audioCache[key]) {
      const audio = new Audio(sounds[key]);
      audio.load();
      audioCache[key] = audio;
    }
  });
};
