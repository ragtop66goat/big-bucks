import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./slice/FormSlice";
import weatherSlice from "./slice/WeatherSlice";
import packageSlice from "./slice/PackageSlice";

export const reducer = combineReducers({ formSlice, weatherSlice, packageSlice });

export const store = configureStore({ reducer });
