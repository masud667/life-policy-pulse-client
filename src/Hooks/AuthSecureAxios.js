import axios from "axios";

const AuthSecureAxios = axios.create({
  baseURL: "https://life-policy-pulse-server.vercel.app",
  withCredentials: true,
});

export default AuthSecureAxios;
