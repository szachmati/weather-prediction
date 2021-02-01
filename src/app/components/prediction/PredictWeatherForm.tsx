import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { FormSelectAsController } from "../common/form/FormSelectAsController";
import { WeatherCondition } from "../../model/model";

interface PredictWeatherFormProps {
  classes: any;
  isUserLogged: boolean;
  onSubmit: (data) => void;
}

export const PredictWeatherForm = (props: PredictWeatherFormProps) => {
  const { reset, handleSubmit, register, control } = useForm();
  const { classes, isUserLogged, onSubmit } = props;
  const conditions: WeatherCondition[] = [WeatherCondition.MINTEMP];

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
              className={classes.formField}
              variant="outlined"
              label="City"
              name="city"
              placeholder="Type city you want to see weather"
              inputRef={register}
              required
            />
          </Grid>
          <Grid item>
            <FormSelectAsController
              control={control}
              defaultValue=""
              label="Condition"
              name="condition"
              options={conditions}
              classes={Array.of(classes.formField)}
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
