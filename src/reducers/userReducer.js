import * as types from "../constants/actionType";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return action.payload;
    case types.CREATE_USER_SUCCESS:
      return state.length !== 0 ? [...state, action.payload] : state;
    default:
      return state;
  }
}
