import { combineReducers, configureStore } from "@reduxjs/toolkit";
import formSlice from "./slice/FormSlice";
import weatherSlice from "./slice/WeatherSlice";
import packageSlice from "./slice/PackageSlice";
import seasonsSlice from "./slice/SeasonsSlice";

export const reducer = combineReducers({ formSlice, weatherSlice, packageSlice, seasonsSlice });

export const store = configureStore({ reducer });
