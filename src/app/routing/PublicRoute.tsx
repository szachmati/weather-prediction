import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const PublicRoute = ({ component: Component, ...props }) => {
  const { isUserLogged } = useContext(UserContext);

  return (
    <Route
      {...props}
      render={(props) => {
        return !isUserLogged() ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};
