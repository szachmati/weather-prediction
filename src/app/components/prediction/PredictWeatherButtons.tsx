import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { showNotification } from "../../store/app.store.action";
import { Severity } from "../alert/Info";
import { useDispatch } from "react-redux";

interface PredictWeatherButtonsProps {
  classes: any;
  isUserLogged: boolean;
}

export const PredictWeatherButtons = (props: PredictWeatherButtonsProps) => {
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const dispatch = useDispatch();
  const { classes, isUserLogged } = props;

  if (isUserLogged) return null;

  const handlePrediction = () => {
    dispatch(
      showNotification({
        severity: Severity.INFO,
        message: "You need to be sign in  to use this function",
      })
    );
    setShowLoginInfo(true);
  };

  if (!isUserLogged) {
    if (!showLoginInfo) {
      return (
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={handlePrediction}
          type="submit"
        >
          Predict
        </Button>
      );
    } else {
      return (
        <Link className={classes.text} to="/signin">
          Signin
        </Link>
      );
    }
  }
};
