import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./slice/FormSlice";
import weatherSlice from "./slice/WeatherSlice";

export const reducer = combineReducers({ formSlice, weatherSlice });

export const store = configureStore({ reducer });
