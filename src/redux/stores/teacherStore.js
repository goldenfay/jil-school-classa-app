import { createStore,compose,applyMiddleware } from "redux";
import thunk from'redux-thunk'
import {TeacherReducer} from "../reducers/";

const store = createStore(TeacherReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;