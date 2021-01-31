import React, {useContext, useState} from "react";
import { selectUser } from "../store/app.store.selector";
import { useSelector } from "react-redux";
import {Button, makeStyles, Typography} from "@material-ui/core";
import {
  ApiInterceptorContext
} from "../context/ApiInterceptorContext";
import { UserContext } from "../context/UserContext";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(3),
  },
  text: {
    fontSize: 20,
    marginBottom: theme.spacing(3)
  },
}));


export const Dashboard = () => {
  const user = useSelector(selectUser);
  const { axiosInstance } = useContext(ApiInterceptorContext);
  const { isUserLogged, hasRole } = useContext(UserContext);
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const classes = useStyles();

  const handlePrediction = () => {
    if (!isUserLogged()) {

    }
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>
        Hello {user?.name} {user?.surname}. It's nice day to predict the weather
        conditions.
      </Typography>
      <Button variant="outlined" color="primary" onClick={handlePrediction}>Predict</Button>
    </div>
  );
};
