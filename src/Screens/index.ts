export enum RootScreens {
  SPLASH = "SplashScreen",
  MAIN = "Main",
  ONBOARDING = "Onboarding",
  AUTHENTICATION = "Authentication",
  SEARCH = "Search",
  DETAILS = "Details",
  EDIT = "Edit",
}

export type RootProps = {
  // [RootScreens.MAIN]: {title: string}; // this is another parameter example
  [RootScreens.MAIN]: undefined; 
  [RootScreens.ONBOARDING]: undefined;
  [RootScreens.AUTHENTICATION]: undefined;
  [RootScreens.SEARCH]: undefined;
  [RootScreens.DETAILS]: undefined;
  [RootScreens.EDIT]: undefined;
  [RootScreens.SPLASH]: undefined;
};

export enum BottomTabScreens {
  OVERVIEW = "Overview",
  HISTORY = "History",
  SAVINGS = "Savings",
  ANALYTICS = "Analytics",
  SETTINGS = "Settings",
}

export type BottomTabRouteProps = {
  [BottomTabScreens.OVERVIEW]: undefined; // this is another parameter example
  [BottomTabScreens.HISTORY]: undefined;
  [BottomTabScreens.SAVINGS]: undefined;
  [BottomTabScreens.ANALYTICS]: undefined;
  [BottomTabScreens.SETTINGS]: undefined;
};

export enum SearchScreens {
  SEARCH_RESULTS = "Search results",
  SEARCH_DETAIL = "Search result detail",
}

export type SearchProps = {
  [SearchScreens.SEARCH_DETAIL]: undefined;
  [SearchScreens.SEARCH_RESULTS]: undefined;
}

export enum AuthenticationScreens {
  LOGIN = "Login",
  SIGNUP = "Signup",
}

export type AuthenticationProps = {
  [AuthenticationScreens.LOGIN]: undefined;
  [AuthenticationScreens.SIGNUP]: undefined;
}