import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {
  ApiInterceptorContext,
  HttpHeaders,
} from "../../context/ApiInterceptorContext";
import { environments } from "../../../environments";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { User } from "../../model/model";
import { initUser, addAccessToken } from "../../store/app.store.action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const defaultValues = {
  email: "",
  password: "",
};

export default function SignIn() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
  });
  const history = useHistory();
  const { axiosInstance } = useContext(ApiInterceptorContext);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = (userCredentials) => {
    console.log(userCredentials);
    axiosInstance
      .post(`${environments.API}/signin`, userCredentials)
      .then(({ data }) => {
        console.log(data);
        //@ts-ignore
        const user: User = jwt_decode(data.access_token).identity;
        dispatch(initUser(user));
        dispatch(addAccessToken({ access_token: data.access_token }));
        history.push("/prediction");
      });
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={register({ required: true })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isDirty || !isValid}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
