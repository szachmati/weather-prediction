import React, { createContext, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { environments } from "../../environments";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/app.store.action";
import { Severity } from "../components/alert/Info";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../store/app.store.selector";

export enum HttpHeaders {
  AUTHORIZATION = "Authorization",
}

enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
}

const axiosInstance = axios.create({
  baseURL: `${environments.API}`,
  headers: {}
});

export const ApiInterceptorContext = createContext({
  axiosInstance: axiosInstance,
});

export function ApiInterceptorContextProvider({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  let requestInterceptor = null;
  let responseInterceptor = null;

  if (accessToken) {
    axiosInstance.defaults.headers[HttpHeaders.AUTHORIZATION] = 'Bearer ' + accessToken;
  }

  useEffect(() => {
    applyInterceptors();
    return () => removeInterceptors();
  }, []);

  const applyInterceptors = () => {
    console.log('*** applyInterceptors()')
    requestInterceptor = axiosInstance.interceptors.request.use(
      (axiosConfig) => handleRequestConfig(axiosConfig),
      (error) => handleRequestError(error)
    );
    responseInterceptor = axiosInstance.interceptors.response.use(
      (axiosResponse) => handleResponseSuccess(axiosResponse),
      (error) => handleResponseError(error)
    );
  };

  const handleRequestError = (error) => {
    console.log(error);
    return Promise.reject(error);
  };

  const handleRequestConfig = (axiosConfig: AxiosRequestConfig): AxiosRequestConfig => {
    console.log("*** handleRequestConfig()");
    return axiosConfig;
  };

  const handleResponseSuccess = (axiosResponse: AxiosResponse) => {
    console.log(axiosResponse);
    if (isCreateOrUpdateMethod(axiosResponse)) {
      sendResponseNotification(
        Severity.SUCCESS,
        "Success: " + axiosResponse?.data?.message
      );
    }
    return axiosResponse;
  };

  const handleResponseError = (error: AxiosError) => {
    console.log(error.response);
    if (isCreateOrUpdateMethod(error)) {
      sendResponseNotification(
        Severity.ERROR,
        "Error: " + error?.response?.data?.error
      );
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
