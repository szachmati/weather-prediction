import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  showNotification,
  blockNotification,
} from "../../store/app.store.action";
import { Severity } from "../alert/Info";
import { useDispatch, useSelector } from "react-redux";
import { selectBlockedNotification } from "../../store/app.store.selector";

interface PredictWeatherButtonsProps {
  classes: any;
  isUserLogged: boolean;
}

export const PredictWeatherButtons = (props: PredictWeatherButtonsProps) => {
  const [showLoginInfo, setShowLoginInfo] = useState(false);
  const dispatch = useDispatch();
  const blockedNotification = useSelector(selectBlockedNotification);
  const { classes, isUserLogged } = props;

  if (isUserLogged) return null;

  const handlePrediction = () => {
    if (!blockedNotification.wasShown && blockedNotification.uuid === null) {
      dispatch(
        showNotification({
          severity: Severity.INFO,
          message: "You need to be sign in  to use this function",
        })
      );
      dispatch(blockNotification());
    }
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
