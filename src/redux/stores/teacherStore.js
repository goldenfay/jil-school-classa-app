import { createStore } from "redux";

import {TeacherReducer} from "../reducers/";

const store = createStore(TeacherReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;