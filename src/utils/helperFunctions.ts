export const dateFormat = (date: string) => {
  //Tue Jun 20 2023 15:57:37 GMT-0400 (Eastern Daylight Time)

  //"2023-06-20T21:54:00.000Z"
  let calendar = date.slice(0, 10);
  let hours = parseInt(date.slice(11, 13));
  // hours = hours - 4;
  let mins = date.slice(14, 16);
  let afterNoon = false;
  if (hours - 12 > 0) {
    hours = hours - 12;
    afterNoon = true;
  }
  return `${calendar} ${hours}:${mins}`;
};

//Sun Jan 04 1970 18:21:00 GMT-0500
export const timeElaspedFormat = (secs: number) => {
  //let numSecs = parseInt(secs);
  let days = parseInt((secs / 86400000).toFixed(0));
  let hours = ((secs % 86400000) / 3600000).toFixed(1);

  if (days < 1) {
    return ` ${hours} Hours`;
  } else {
    return ` ${days} Days ${hours} Hours`;
  }
};
