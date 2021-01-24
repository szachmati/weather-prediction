import React, { createContext } from "react";
import axios from "axios";
import { environments } from "../../environments";
import { User, UserRole } from "../model/model";

export enum HttpHeaders {
  AUTHORIZATION = "Authorization",
}

const axiosInstance = axios.create({
  baseURL: `${environments.API}`,
});

export const ApiInterceptorContext = createContext({
  axiosInstance: axiosInstance,
});

export function ApiInterceptorContextProvider() {
  const mockUserLogged: User = {
    email: "jan@kowalski.pl",
    name: "Jan",
    password: "test",
    surname: "Kowalski",
    role: UserRole.USER,
  };
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("axios.request onFulfilled(): ", config);
      if (mockUserLogged) {
        config.headers[HttpHeaders.AUTHORIZATION] =
          "Bearer " + btoa(mockUserLogged.password);
      }
      return config;
    },
    (error) => {
      console.log("axios.request onReject(): ", error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (config) => {
      console.log("axios.response onFulfilled(): ", config);
      return config;
    },
    (error) => {
      console.log("axios.response onReject(): ", error);
      return Promise.reject(error);
    }
  );

  return (
    <ApiInterceptorContext.Provider
      value={{ axiosInstance }}
    ></ApiInterceptorContext.Provider>
  );
}
