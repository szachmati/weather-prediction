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
import { convertToDate } from "../utils/Utils";

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
  x: string;
  y: number;
}

enum DataType {
  TEST = "TEST",
  TRAIN = "TRAIN",
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
        setPredictionResponse(convertData(data, DataType.TRAIN));
        setPredictionTestResponse(convertData(data, DataType.TEST));
        setShowBackdrop(false);
        setShowForm(false);
      })
      .catch(() => {
        setShowBackdrop(false);
      });
  };

  const handleReset = () => {
    setPredictionResponse([]);
    setPredictionTestResponse([]);
  };

  const showChart = () => {
    return (
      isUserLogged() &&
      predictionResponse.length > 0 &&
      predictionTestResponse.length > 0
    );
  };
  return (
    <React.Fragment>
      {showChart() && (
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
      {showChart() && (
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

const convertData = (data: Array<any>, dataType: DataType) => {
  let predictedData: PredictedData[] = [];
  const startDate = new Date();

  switch (dataType) {
    case DataType.TEST:
      startDate.setDate(startDate.getDate() - data.length);
      data.map((element) => {
        updateDate(startDate);
        addData(predictedData, element, startDate);
      });
      return predictedData;
    case DataType.TRAIN:
      const half_length = Math.ceil(data.length / 2);
      startDate.setDate(startDate.getDate() - half_length);
      const trained = data.splice(0, half_length);
      trained.map((element) => {
        updateDate(startDate);
        addData(predictedData, element, startDate);
      });
      return predictedData;
  }
};

const updateDate = (currentDate: Date) =>
  currentDate.setDate(currentDate.getDate() + 1);

const addData = (
  predictedData: PredictedData[],
  element: any,
  startDate: Date
) => {
  predictedData.push({
    x: convertToDate(startDate, "YYYY-MM-DD"),
    y: element[0],
  });
};
