export const setJwt = (jwt) => {
  localStorage.setItem("token", jwt);
};

export const getJwt = () => localStorage.getItem("token");

export const deleteJwt = () => localStorage.removeItem("token");
