import { createContext, useContext, useState } from "react";

const EventContext = createContext();


export const EventProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [eventId, setEventId] = useState(null);

  const login = (id) => {
    setIsAuthenticated(true);
    setEventId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEventId(null);
  };

  return (
    <EventContext.Provider value={{ isAuthenticated, login, logout, eventId }}>
      {children}
    </EventContext.Provider>
  );
};
export const useEventContext = () => useContext(EventContext);
