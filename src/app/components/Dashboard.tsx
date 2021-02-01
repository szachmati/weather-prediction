import React, { useContext, useState } from "react";
import { selectUser } from "../store/app.store.selector";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";
import { ApiInterceptorContext } from "../context/ApiInterceptorContext";
import { UserContext } from "../context/UserContext";
import clsx from "clsx";
import { SimpleBackdrop } from "./common/Backdrop";
import { PredictWeatherForm } from "./prediction/PredictWeatherForm";
import { PredictWeatherButtons } from "./prediction/PredictWeatherButtons";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/app.store.action";
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
    fontSize: 22,
    marginBottom: theme.spacing(3),
  },
  button: {
    fontSize: 18,
  },
  margin: {
    marginRight: 6,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inlineFlex: {
    display: "inline-flex",
  },
  formField: { width: 350, marginBottom: 20 },
}));

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const { axiosInstance } = useContext(ApiInterceptorContext);
  const { isUserLogged } = useContext(UserContext);
  const dispatch = useDispatch();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const classes = useStyles();

  const handleSubmit = (data) => {
    console.log(data);
    dispatch(
      showNotification({
        severity: Severity.INFO,
        message: "Processing request make take some time. Please be patient",
      })
    );
    setShowBackdrop(true);
    setTimeout(() => {
      setShowBackdrop(false);
    }, 5000);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div className={classes.inlineFlex}>
          <Typography className={clsx(classes.text, classes.margin)}>
            Hello
          </Typography>
          {isUserLogged() && (
            <Typography className={classes.text}>
              {user.name} {user.surname}
            </Typography>
          )}
        </div>
        <Typography className={classes.text}>
          It's nice day to predict weather 🙃
        </Typography>
        <PredictWeatherButtons
          classes={classes}
          isUserLogged={isUserLogged()}
        />
        <PredictWeatherForm
          classes={classes}
          isUserLogged={isUserLogged()}
          onSubmit={handleSubmit}
        />
      </div>
      <SimpleBackdrop show={showBackdrop} />
    </React.Fragment>
  );
};
