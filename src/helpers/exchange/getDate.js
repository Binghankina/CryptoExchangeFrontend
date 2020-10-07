const fixTime = time => ("00" + time).slice(-2);

export const getDate = (data, allowyear = false) => {
  const date = new Date(data);
  const Year = allowyear ? date.getFullYear() + "-" : "";
  const Months = fixTime(date.getMonth() + 1);
  const Dates = fixTime(date.getDate());
  const Hours = fixTime(date.getHours());
  const Minutes = fixTime(date.getMinutes());
  const Seconds = fixTime(date.getSeconds());
  return `${Year}${Months}-${Dates} ${Hours}:${Minutes}:${Seconds}`;
};
