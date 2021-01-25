import React, { createContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { environments } from "../../environments";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/app.store.action";
import { Severity } from "../components/alert/Info";

export enum HttpHeaders {
  AUTHORIZATION = "Authorization",
}

enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

const axiosInstance = axios.create({
  baseURL: `${environments.API}`,
});

export const ApiInterceptorContext = createContext({
  axiosInstance: axiosInstance,
});

export function ApiInterceptorContextProvider({ children }) {
  const dispatch = useDispatch();

  let requestInterceptor;
  let responseInterceptor;

  useEffect(() => {
    applyInterceptors();
    return () => removeInterceptors();
  }, []);

  const applyInterceptors = () => {
    requestInterceptor = axiosInstance.interceptors.request.use(
      (axiosConfig) => axiosConfig,
      (error) => Promise.reject(error)
    );
    responseInterceptor = axiosInstance.interceptors.response.use(
      (axiosResponse) => handleResponseSuccess(axiosResponse),
      (error) => handleResponseError(error)
    );
  };

  const handleResponseSuccess = (axiosResponse: AxiosResponse) => {
    console.log(axiosResponse);
    if (isCreateOrUpdateMethod(axiosResponse)) {
      sendResponseNotification(Severity.SUCCESS, "Success: " + axiosResponse?.data?.message);
    }
    return axiosResponse;
  };

  const handleResponseError = (error: AxiosError) => {
    console.log(error.response);
    if (isCreateOrUpdateMethod(error)) {
      sendResponseNotification(Severity.ERROR, "Error: " + error?.response?.data?.error);
    }
    return Promise.reject(error);
  };

  const sendResponseNotification = (severity: Severity, message: string) => {
    dispatch(showNotification({ severity: severity, message: message }));
  };

  const removeInterceptors = () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  };

  const isCreateOrUpdateMethod = (axiosResponse) => {
    return (
      axiosResponse?.config?.method?.toUpperCase() === HttpMethod.POST ||
      axiosResponse?.config?.method?.toUpperCase() === HttpMethod.PUT
    );
  };

  return (
    <ApiInterceptorContext.Provider value={{ axiosInstance }}>
      {children}
    </ApiInterceptorContext.Provider>
  );
}
