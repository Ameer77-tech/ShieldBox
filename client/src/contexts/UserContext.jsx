import { createContext, useState } from "react";

export const userContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    email : "",
    userName : "",
    theme : ""
  });
  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
};
