import React, { createContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { environments } from "../../environments";
import { useDispatch } from "react-redux";
import { handleApiMessage } from "../store/app.store.action";
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
    return () => {
      removeInterceptors();
    };
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
    if (isCreateOrUpdateMethod(axiosResponse)) {
      sendResponseNotification(Severity.SUCCESS, "Success");
    }
    return axiosResponse;
  };

  const handleResponseError = (error) => {
    if (isCreateOrUpdateMethod(error)) {
      sendResponseNotification(Severity.ERROR, "Error has occured");
    }
    return Promise.reject(error);
  };

  const sendResponseNotification = (severity: Severity, message: string) => {
    dispatch(handleApiMessage({ severity: severity, message: message }));
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
