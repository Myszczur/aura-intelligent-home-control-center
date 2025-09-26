/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useHomeEngine } from "../hooks/useHomeEngine";

// 1. Tworzymy kontekst
const HomeEngineContext = createContext(null);

// 2. Tworzymy Provider, który będzie dostarczał dane
export const HomeEngineProvider = ({ children }) => {
  const engine = useHomeEngine(); // Używamy naszego hooka
  return (
    <HomeEngineContext.Provider value={engine}>
      {children}
    </HomeEngineContext.Provider>
  );
};

// 3. Hook do korzystania z kontekstu
export const useHome = () => {
  const context = useContext(HomeEngineContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeEngineProvider");
  }
  return context;
};
