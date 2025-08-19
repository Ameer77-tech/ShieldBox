import { createContext, useMemo, useState } from "react";

export const secretKeyContext = createContext(null);

export const SecretKeyProvider = ({ children }) => {
  const [secretKey, setSecretKey] = useState("");
  const value = useMemo(() => ({ secretKey, setSecretKey }), [secretKey]);
  return (
    <secretKeyContext.Provider value={value}>
      {children}
    </secretKeyContext.Provider>
  );
};
