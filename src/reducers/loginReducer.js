import * as types from "../constants/actionType";

const initialState = {};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case types.KEEP_SIGNED_SUCCESS:
      return { ...state, user: action.payload };
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
}
