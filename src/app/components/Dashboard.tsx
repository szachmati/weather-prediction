import React, { useContext, useState } from "react";
import { selectUser } from "../store/app.store.selector";
import { showNotification } from "../store/app.store.action";
import { useSelector } from "react-redux";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { ApiInterceptorContext } from "../context/ApiInterceptorContext";
import { UserContext } from "../context/UserContext";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Severity } from "./alert/Info";

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
    marginBottom: theme.spacing(3),
  },
}));

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { axiosInstance } = useContext(ApiInterceptorContext);
  const { isUserLogged, hasRole } = useContext(UserContext);
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const classes = useStyles();

  const handlePrediction = () => {
    if (isUserLogged()) {
      //TODO in progress
    } else {
      dispatch(
        showNotification({
          severity: Severity.INFO,
          message: "You need to be sign in  to use this function",
        })
      );
      setShowLoginInfo(true);
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.text}>Hello</Typography>
      {isUserLogged() && (
        <Typography className={classes.text}>
          {user.name} {user.surname}
        </Typography>
      )}
      <Typography className={classes.text}>
        It's nice day to predict weather 🙃
      </Typography>
      {!showLoginInfo ? (
        <Button variant="outlined" color="primary" onClick={handlePrediction}>
          Predict
        </Button>
      ) : (
        <Link to="/signin">Signin</Link>
      )}
    </div>
  );
};
