import axios from "axios";

const backUrl = "https://e-commerce-api-5sxy.onrender.com"; 
// const backUrl = "http://localhost:3500"

const AxiosInstance = axios.create({
  baseURL: backUrl,
  timeout: 60 * 1000, //60sec
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
},
});

export default AxiosInstance;
