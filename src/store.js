import {combineReducers, configureStore} from "@reduxjs/toolkit";
import formSlice from "./slice/FormSlice";

export const reducer = combineReducers({formSlice});

export const store = configureStore({reducer})