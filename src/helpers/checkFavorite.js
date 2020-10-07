import store from "@/store";

export const checkFavorite = ticker => {
  const data = store.getters["public/getAllFavorites"];
  return data.includes(ticker);
};
