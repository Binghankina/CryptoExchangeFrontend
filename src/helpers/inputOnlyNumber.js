export const inputOnlyNumber = (number, fixed) => {
  const numberSplit = String(number).split(".", 2);
  if (numberSplit.length > 1) {
    numberSplit[1] = numberSplit[1].substring(0, fixed);
    number = [numberSplit[0], numberSplit[1]].join(".");
  }
  return number;
};
