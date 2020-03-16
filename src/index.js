import React from "react";
import { render } from "react-dom";
import logger from "redux-logger";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import App from "./App";
import { rootReducer, rootSaga } from "./slices";

import "./index.css";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
middleware.push(logger);

const finalStore = (/*preloadedState = rootReducer()*/) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = finalStore();

//const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
