import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import add from "./Reducer/add";

const reducer = combineReducers({
  add: add,
});

const middleware = applyMiddleware(thunk);

export default createStore(reducer, middleware);
