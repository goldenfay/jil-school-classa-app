import { createStore,compose,applyMiddleware } from "redux";
import thunk from'redux-thunk'
import {AdminReducer} from "../reducers/";

const store = createStore(AdminReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;