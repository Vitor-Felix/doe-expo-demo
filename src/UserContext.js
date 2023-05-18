import React, { createContext, useState } from 'react';

// Create the user context
export const UserContext = createContext();

// Create a provider component to wrap your app and provide the user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};