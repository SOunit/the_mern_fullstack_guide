import { createContext } from "react";

export const AuthContext = createContext({
  // placeholder
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});
