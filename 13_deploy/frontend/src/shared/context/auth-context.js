import { createContext } from "react";

export const AuthContext = createContext({
  // placeholder, for auto competion
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
