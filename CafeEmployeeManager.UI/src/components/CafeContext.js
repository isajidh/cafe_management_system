import React, { createContext, useContext, useState } from "react";

const CafeContext = createContext();

export const CafeProvider = ({ children }) => {
  const [cafeID, setCafeID] = useState("");

  return (
    <CafeContext.Provider value={{ cafeID, setCafeID }}>
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => useContext(CafeContext);
