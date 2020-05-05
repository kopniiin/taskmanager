import moment from "moment";

export const formatTime = (date) => moment(date).format(`hh:mm`);

export const formatDate = (date) => moment(date).format(`DD MMMM`);
