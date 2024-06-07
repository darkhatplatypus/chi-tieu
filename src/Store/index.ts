import { API } from "@/Services/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { homeReducers, themeReducers } from "./reducers";

const reducers = combineReducers({
  [API.reducerPath]: API.reducer,
  theme: themeReducers,
  home: homeReducers,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["theme"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware);
    // // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    // //   const createDebugger = require("redux-flipper").default;
    // //   middlewares.push(createDebugger());
    // // }
    return middlewares;
    // return getDefaultMiddleware().concat(API.middleware)
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
  
export const { useGetUserQuery} = API;
