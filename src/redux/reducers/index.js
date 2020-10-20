import {combineReducers} from "redux"
import ManagerReducers from './managerReducer'
import TeacherReducer from './managerReducer'


const teacherReducer=TeacherReducer.managerReducer
export {ManagerReducers,teacherReducer}