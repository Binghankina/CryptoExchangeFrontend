export const getURLParam = (url, param) => new URL(url).searchParams.get(param);
