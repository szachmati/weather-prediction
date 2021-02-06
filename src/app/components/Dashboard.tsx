import React, { useContext, useState } from "react";
import { selectUser } from "../store/app.store.selector";
import { useSelector } from "react-redux";
import {
  Box,
  Collapse,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ApiInterceptorContext } from "../context/ApiInterceptorContext";
import { UserContext } from "../context/UserContext";
import clsx from "clsx";
import { SimpleBackdrop } from "./common/Backdrop";
import { PredictWeatherForm } from "./prediction/PredictWeatherForm";
import { PredictWeatherButtons } from "./prediction/PredictWeatherButtons";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/app.store.action";
import { Severity } from "./alert/Info";
import { WeatherDto } from "../model/model";
import { LineChart } from "./prediction/LineChart";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

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

interface PredictedData {
  x: number;
  y: number;
}

export const Dashboard = () => {
  const user = useSelector(selectUser);
  const { axiosInstance } = useContext(ApiInterceptorContext);
  const { isUserLogged, hasRole } = useContext(UserContext);
  const dispatch = useDispatch();
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [predictionResponse, setPredictionResponse] = useState<PredictedData[]>(
    []
  );
  const [predictionTestResponse, setPredictionTestResponse] = useState<
    PredictedData[]
  >([]);
  const classes = useStyles();

  const handleSubmit = (data: WeatherDto) => {
    console.log(data);
    dispatch(
      showNotification({
        severity: Severity.INFO,
        message: "Processing request make take some time. Please be patient",
      })
    );
    setShowBackdrop(true);
    axiosInstance
      .get("/predict", {
        params: { city: data.city, condition: data.condition },
      })
      .then(({ data }) => {
        console.log(data);
        setPredictionResponse(convertData(data, "trained"));
        setPredictionTestResponse(convertData(data, "tested"));
        setShowBackdrop(false);
      })
      .catch((error) => {
        console.error(error);
        setShowBackdrop(false);
      });
  };

  const handleReset = () => {
    setPredictionResponse([]);
    setPredictionTestResponse([]);
  };

  return (
    <React.Fragment>
      {isUserLogged() &&
        predictionResponse.length > 0 &&
        predictionTestResponse.length > 0 && (
          <Box>
            <IconButton onClick={() => setShowForm(!showForm)}>
              {showForm ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Box>
        )}
      <Collapse unmountOnExit timeout="auto" in={showForm}>
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
            onReset={handleReset}
          />
        </div>
      </Collapse>
      {isUserLogged() &&
        predictionResponse.length > 0 &&
        predictionTestResponse.length > 0 && (
          <LineChart
            label="Chart"
            dataArray={predictionResponse.map((resp) => resp.y)}
            testArray={predictionTestResponse.map((resp) => resp.y)}
            labels={predictionResponse.map((resp) => resp.x)}
          />
        )}

      <SimpleBackdrop show={showBackdrop} />
    </React.Fragment>
  );
};

const convertData = (data: Array<any>, type: String) => {
  let formatted: PredictedData[] = [];
  const half_length = Math.ceil(data.length / 2);
  const endDate = new Date();
  const startDate = endDate; // endDate - data.length/2
  if (type == "tested") {
    data.map((element, index) => {
      formatted.push({
        x: index,
        y: element[0],
      });
    });
    console.log(formatted);
    return formatted;
  }

  const trained = data.splice(0, half_length);

  if (type == "trained") {
    trained.map((element, index) => {
      formatted.push({
        x: index,
        y: element[0],
      });
    });
    console.log(formatted);
    return formatted;
  }
};
