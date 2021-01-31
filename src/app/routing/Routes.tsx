import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import { WeatherPredictor } from "../components/WeatherPredictor";
import { UserRole } from "../model/model";

interface RouteModel {
  path: string;
  component: React.ComponentType<any>;
  routePrivilege?: UserRole;
}

const routes: RouteModel[] = [
  {
    path: "/signin",
    component: SignIn,
  },
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/prediction",
    component: WeatherPredictor,
    routePrivilege: UserRole.USER,
  },
];

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            exact
            path={route.path}
            component={route.component}
          />
        );
      })}
    </Switch>
  );
}
export default Content;
