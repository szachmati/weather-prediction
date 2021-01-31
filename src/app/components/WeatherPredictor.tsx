import React from "react";
import { selectUser } from "../store/app.store.selector";
import { useSelector } from "react-redux";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  text: {
    fontSize: 20,
  },
}));

export const WeatherPredictor = () => {
  const user = useSelector(selectUser);
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
