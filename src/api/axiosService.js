import axios from "axios";

const baseURL = process.env.API_URL;

let api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
