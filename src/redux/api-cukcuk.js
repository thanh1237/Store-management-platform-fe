import axios from "axios";
import { toast } from "react-toastify";

const accessToken = localStorage.getItem("cukcukAccessToken");
const cukcukApi = axios.create({
  baseURL: process.env.REACT_APP_CUKCUK_API + "/api",
  headers: {
    CompanyCode: "bake",
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

/**
 * console.log all requests and responses
 */
cukcukApi.interceptors.request.use(
  (request) => {
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

cukcukApi.interceptors.response.use(
  (response) => {
    if (response.data.data && response.data.data.accessToken) {
      cukcukApi.defaults.headers.common["authorization"] =
        "Bearer " + response.data.data.accessToken;
    }
    return response;
  },
  function (error) {
    error = error.response.data;
    let errorMsg = error.message || "";
    if (error.errors && error.errors.message)
      errorMsg = errorMsg + ": " + error.errors.message;
    toast.error(errorMsg);
    return Promise.reject(error);
  }
);

export default cukcukApi;
