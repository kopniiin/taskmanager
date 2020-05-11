import moment from "moment";

export const formatTime = (date) => moment(date).format(`hh:mm`);

export const formatDate = (date) => moment(date).format(`DD MMMM`);

export const checkIfPast = (date) => date < Date.now();

export const checkIfToday = (date) => {
  const today = new Date();
  return moment(date).diff(moment(today), `days`) === 0 && date.getDate() === today.getDate();
};
