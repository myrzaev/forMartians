import * as axios from "axios";
import * as endpoints from "./endpoints";

const axiosInstance = axios.create({
  headers: {
    "content-type": "application/json",
  },
});

const authErrors = {
  error_description: "Неправильный логин или пароль.",
};

export const getAuthErrorMessage = (error) => {
  return error.response &&
    error.response.data &&
    error.response.data.error_description
    ? authErrors["error_description"]
    : "Что-то пошло не так!";
};

export const getApiErrorMessage = (error) => {
  return error.response && error.response.data && error.response.data.errors
    ? error.response.data.errors
    : "Что-то пошло не так!";
};

export const getApiErrorMessages = (error) => {
  return error.response && error.response.data && error.response.data.errors
    ? error.response.data.errors[0]
    : "Что-то пошло не так!";
};

export const refreshToken = (data) => {
  const url = endpoints.refreshToken;

  // Need to remove it from here and keep it in protected place
  const objectData = {
    grant_type: "refresh_token",
    client_id: "832afa32-cabe-40a0-89092241cd85e47d",
    client_secret: "secret",
    scope: "ro.api openid offline_access",
    ...data,
  };

  let formBody = [];
  for (let property in objectData) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objectData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const header = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };

  return axiosInstance.post(url, formBody, header);
};

export const login = (data) => {
  const url = endpoints.endpoints.auth.login;

  const objectData = {
    client_id: "832afa32-cabe-40a0-89092241cd85e47d",
    client_secret: "secret",
    grant_type: "password",
    scope: "ro.api openid offline_access",
    ...data,
  };

  let formBody = [];
  for (let property in objectData) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(objectData[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const header = {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  };

  return axiosInstance.post(url, formBody, header);
};

export const generateOtp = (data) => {
  const url = endpoints.endpoints.auth.generateOtp;

  return axiosInstance.post(url, data);
};

export const verifyOtp = (data) => {
  const url = endpoints.endpoints.auth.verifyOtp;

  return axiosInstance.post(url, data);
};

export const testSMS = (data) => {
  const url = endpoints.endpoints.SMS.testSMS;

  return axiosInstance.post(url, data);
};

export const resetPassword = (phone) => {
  const url = endpoints.endpoints.auth.resetPassword;

  return axiosInstance.post(url, phone);
};

export const confirmNewPassword = (password) => {
  const url = endpoints.endpoints.auth.confirmNewPassword;

  return axiosInstance.post(url, password);
};

export const checkRegister = (data) => {
  const url = endpoints.endpoints.auth.checkRegister;

  return axiosInstance.post(url, data);
};

export const getChannels = () => {
  const url = endpoints.endpoints.personalArea.getTVChannels;

  return axiosInstance.get(url);
};
