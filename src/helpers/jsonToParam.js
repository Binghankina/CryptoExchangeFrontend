export const jsonToParam = json => {
  let parts = [];
  for (var i in json) {
    if (json.hasOwnProperty(i) && json[i]) {
      parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(json[i]));
    }
  }
  return parts.length ? "?" + parts.join("&") : "";
};
