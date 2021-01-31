import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { WeatherPredictor } from "../components/WeatherPredictor";
import { UserRole } from "../model/model";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

interface RouteModel {
  path: string;
  component: React.ComponentType<any>;
  protected: boolean;
  routePrivilege?: UserRole;
}

const routes: RouteModel[] = [
  {
    path: "/signin",
    component: SignIn,
    protected: false,
  },
  {
    path: "/signup",
    component: SignUp,
    protected: false,
  },
  {
    path: "/prediction",
    component: WeatherPredictor,
    protected: true,
    routePrivilege: UserRole.USER,
  },
];

function Content() {
  return (
    <Switch>
      {routes.map((route, index) => {
        return !route.protected ? (
          <PublicRoute
            key={index}
            exact
            path={route.path}
            component={route.component}
          />
        ) : (
          <PrivateRoute
            key={index}
            exact
            routePrivilege={route.routePrivilege}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
}
export default Content;
