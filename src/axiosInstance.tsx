import axios from "axios";

const backUrl = "https://e-commerce-api-5sxy.onrender.com"; 
// const backUrl = "http://localhost:3500"

const AxiosInstance = axios.create({
  baseURL: backUrl,
  timeout: 60 * 1000, //60sec
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
},
});

AxiosInstance.interceptors.request.use(
  function (config) {
    const token = `Bearer ${sessionStorage.getItem("token")}`; // o token sempre sera puxado do localStorage, e a funcao setToken() do AuthContext, com o segundo parametro como true, salva o token no localStorage
    config.headers.Authorization = token;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
