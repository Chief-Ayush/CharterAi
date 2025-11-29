import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("charterAiUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("charterAiUser");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("charterAiUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("charterAiUser");
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
