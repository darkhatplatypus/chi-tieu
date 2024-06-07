import React from "react";

export const AuthenticationContext = React.createContext({
  authenticated: false,
  setAuthenticated: (value: boolean) => {},
});
