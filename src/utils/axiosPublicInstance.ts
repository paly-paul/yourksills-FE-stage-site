import axios from "axios";

const publicInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default publicInstance;
