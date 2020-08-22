import { combineReducers } from "redux";
import users from "./userReducer";
import apiCallStatus from "./apiStatusReducer";
import currentUser from "./loginReducer";
import { LOGOUT } from "../constants/actionType";

const appReducer = combineReducers({
  users,
  apiCallStatus,
  currentUser,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
