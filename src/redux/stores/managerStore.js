import { createStore } from "redux";

import {ManagerReducers} from "../reducers/";

const store = createStore(ManagerReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;