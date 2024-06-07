import React from "react";

export const AppLaunchContext = React.createContext({
  appLaunched: false,
  setAppLaunched: (value: boolean) => {},
});
