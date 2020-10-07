export const removeURLParam = (url, param) => {
  const reg = new RegExp("((&)*" + param + "=([^&]*))", "g");
  return url.replace(reg, "");
};
