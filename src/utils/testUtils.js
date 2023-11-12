import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {reducer} from "../store";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";
import {Provider} from "react-redux";

// Mock Store for testing ===============================================
export const createMockStore = () => {
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    })
  })
}

function renderWithRouter(component, route = '/') {
  // Set the initial route to the provided value (default: '/')
  const initialEntries = [route];

  return render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      {component}
    </MemoryRouter>
  );
}

const customRenderReturnMockStore = (ui, options) => {
  const {initialState, ...renderOptions} = options;

  let store;
  const middleWares = getDefaultMiddleware({serializableCheck: false})
  const mockStore = configureMockStore(middleWares)
  if(!initialState){
    store = mockStore();
  } else {
    const middleWares = getDefaultMiddleware({serializableCheck: false})
    const mockStore = configureMockStore(middleWares)
    store = mockStore(initialState);
  }

  const wrapper = ({children}) => {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  return {...render(ui, {wrapper, ...renderOptions}), store}
}

export default renderWithRouter;
export * from '@testing-library/react'
export {customRenderReturnMockStore}
