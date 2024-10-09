import React, { createContext, useState } from 'react';

export const userContext = createContext();

function AuthContext({children}) {
  const [user, setUser] = useState(null); // Correct usage of useState

  const login = (user) => {
    setUser(user);
    localStorage.setItem("token", user.token); // Assuming you store a token in local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  )
}

export default AuthContext;
