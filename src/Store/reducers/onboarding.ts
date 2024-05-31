import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "appLaunched",
  initialState: { launched: false},
  reducers: {
    changeLaunchState: (state, { payload: { launched } }) => {
      if (typeof launched !== "undefined") {
        state.launched = launched;
      }
    },
    setLaunchState: (state, { payload: { launched } }) => {
      if (!state.launched) {
        state.launched = launched;
      }
    },
  },
});

export const { changeLaunchState, setLaunchState } = slice.actions;

export const onboardingReducers = slice.reducer;
