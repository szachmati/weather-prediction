import moment from "moment";

export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const convertToDate = (date: Date, dateFormat: string) => {
  return moment(date).format(dateFormat);
};
