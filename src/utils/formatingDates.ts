import moment, { Moment } from "moment";
import "moment/locale/es";

moment.locale("es");

export const formatDate = ({ date }: { date: string }) => {
  const Date = moment.utc(date);
  return Date.format("dddd, D [de] MMMM [de] YYYY, h:mm a").toUpperCase();
};
