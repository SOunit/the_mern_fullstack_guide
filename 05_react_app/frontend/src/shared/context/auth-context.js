import { createContext } from "react";

export const AuthContext = createContext({
  // placeholder
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
