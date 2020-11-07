import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_NOT_SECRET_CODE,
});

export default AxiosInstance;
