import "@testing-library/jest-dom/extend-expect"; // Correct import

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { store, RootState, AppDispatch } from "../src/store/store";

declare global {
  var store: {
    getState: () => RootState;
    dispatch: AppDispatch;
  };
}

global.store = store;
global.React = require("react");
