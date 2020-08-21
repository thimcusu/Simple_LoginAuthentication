import { api } from "./axiosService";
import { handleResponse, handleError } from "./apiUtil";
import { getJwt } from "../utils/jwt";

export const getUsers = () => {
  const jwt = getJwt();
  return api({
    url: "/users",
    method: "GET",
    headers: { authorization: `Bearer ${jwt}` },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const createUser = (data) => {
  return api({
    url: "/users",
    method: "POST",
    data,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const loginUser = (data) => {
  return api({
    url: "/auth/login",
    method: "POST",
    data,
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getLoginedUser = () => {
  const jwt = getJwt();
  return api({
    url: "/me",
    method: "GET",
    headers: { authorization: `Bearer ${jwt}` },
  })
    .then(handleResponse)
    .catch(handleError);
};
