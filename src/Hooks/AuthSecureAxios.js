import axios from "axios";

const AuthSecureAxios = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export default AuthSecureAxios;
