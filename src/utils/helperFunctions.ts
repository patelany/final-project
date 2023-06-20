const dateFormat = (date: string) => {
  //Tue Jun 20 2023 15:57:37 GMT-0400 (Eastern Daylight Time)

  //"2023-06-20T21:54:00.000Z"
  let calendar = date.slice(0, 10);
  let hours = parseInt(date.slice(11, 13));
  let mins = date.slice(14, 16);
  let afterNoon = false;
  if (hours - 12 > 0) {
    hours = hours - 12;
    afterNoon = true;
  }
  return `${calendar} ${hours}:${mins}`;
};

export default dateFormat;
