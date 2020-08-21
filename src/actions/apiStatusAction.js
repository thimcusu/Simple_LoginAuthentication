import * as types from "../constants/actionType";

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}

export function apiCallError(err) {
  return { type: types.API_CALL_ERROR, payload: err };
}
