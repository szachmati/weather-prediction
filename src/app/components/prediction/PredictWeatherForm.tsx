import React from "react";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";

interface PredictWeatherFormProps {
  classes: any;
  isUserLogged: boolean;
  onSubmit: (data) => void;
}

export const PredictWeatherForm = (props: PredictWeatherFormProps) => {
  const { reset, handleSubmit, register } = useForm();
  const { classes, isUserLogged, onSubmit } = props;

  const submitForm = (data) => {
    console.log(data);
    onSubmit(data);
  };

  const handleReset = () => reset();

  return isUserLogged ? (
    <div>
      <Grid container>
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid item>
            <TextField
              style={{ width: 350, marginBottom: 20 }}
              variant="outlined"
              label="City"
              name="city"
              placeholder="Type city you want to see weather"
              inputRef={register}
              required
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: 350, marginBottom: 20 }}
              variant="outlined"
              label="Condition"
              name="condition"
              placeholder="Choose weather condition you want to predict"
              inputRef={register}
              required
            />
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                type="submit"
              >
                Predict
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  ) : null;
};
