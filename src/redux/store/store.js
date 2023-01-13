import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "../sagas/index";
import rootReducer from "../reducer";

const sagaMiddleware = createSagaMiddleware();

// const enhancers = [composeWithDevTools(), applyMiddleware(sagaMiddleware)];

// const store = createStore(rootReducer,  applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
