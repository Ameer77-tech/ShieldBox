import { createContext, useState } from "react";

export const secretKeyContext = createContext(null);

export const SecretKeyProvider = ({ children }) => {
  const [secretKey, setSecretKey] = useState("");
  return (
    <secretKeyContext.Provider value={{ secretKey, setSecretKey }}>
      {children}
    </secretKeyContext.Provider>
  );
};
