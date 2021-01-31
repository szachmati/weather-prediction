import React, { useContext, useEffect } from "react";
import { selectUser } from "../store/app.store.selector";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import {
  ApiInterceptorContext,
  HttpHeaders,
} from "../context/ApiInterceptorContext";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  text: {
    fontSize: 20,
  },
}));

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const { axiosInstance } = useContext(ApiInterceptorContext);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>
        Hello {user?.name} {user?.surname}. It's nice day to predict the weather
        conditions.
      </Typography>
    </div>
  );
};