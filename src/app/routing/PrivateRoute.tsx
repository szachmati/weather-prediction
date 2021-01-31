import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const PrivateRoute = ({
  component: Component,
  routePrivilege,
  ...props
}) => {
  const { isUserLogged, hasRole } = useContext(UserContext);

  const isUserAuthorized = () => {
    return isUserLogged() && hasRole(routePrivilege);
  };

  return (
    <Route
      {...props}
      render={(props) => {
        return isUserAuthorized() ? (
          <Component {...props} />
        ) : isUserLogged() ? (
          <Redirect to="/ " />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};
