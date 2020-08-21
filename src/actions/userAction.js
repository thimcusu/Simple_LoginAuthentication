import {
  LOAD_USERS_SUCCESS,
  LOGIN_SUCCESS,
  KEEP_SIGNED_SUCCESS,
  LOGOUT,
  CREATE_USER_SUCCESS,
} from "../constants/actionType";
import { beginApiCall, apiCallError } from "./apiStatusAction";
import {
  getUsers,
  loginUser,
  getLoginedUser,
  createUser,
} from "../api/userApi";
import { setJwt, deleteJwt } from "../utils/jwt";

export function loadUsers() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getUsers()
      .then((users) => {
        dispatch({ type: LOAD_USERS_SUCCESS, payload: users });
      })
      .catch((err) => {
        dispatch(apiCallError(err));
      });
  };
}

export function keepSigned(user) {
  return { type: KEEP_SIGNED_SUCCESS, payload: user };
}

export function postLoginUser(user) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return loginUser(user)
      .then((res) => {
        setJwt(res.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.token });
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}

export function getCurrentUser() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getLoginedUser()
      .then((res) => {
        dispatch(keepSigned(res.user));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
      });
  };
}

export function logOut() {
  return function (dispatch) {
    deleteJwt();
    return dispatch({ type: LOGOUT });
  };
}

export function postUser(user) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return createUser(user)
      .then((user) => {
        dispatch({ type: CREATE_USER_SUCCESS, payload: user });
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
}
