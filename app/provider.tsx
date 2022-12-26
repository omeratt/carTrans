"use client";

import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
// import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "../store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{() => children}</PersistGate>
    </Provider>
  );
}
