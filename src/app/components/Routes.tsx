import React from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface RouteModel {
  path: string;
  component: React.ComponentType<any>;
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
];

function Content() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      {routes.map((route) => {
        return <Route exact path={route.path} component={route.component} />;
      })}
    </Switch>
  );
}
export default Content;
