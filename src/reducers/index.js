import { combineReducers } from "redux";
import users from "./userReducer";
import apiCallStatus from "./apiStatusReducer";
import currentUser from "./loginReducer";

const rootReducer = combineReducers({
  users,
  apiCallStatus,
  currentUser,
});

export default rootReducer;
