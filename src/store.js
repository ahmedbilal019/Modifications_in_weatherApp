import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice"; // Import your weather reducer

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
