import store from "@/store";

export const AddOrRemoveFavorite = ticker =>
  store.dispatch("public/changeFavorites", ticker);
