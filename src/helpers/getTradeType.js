import { translation } from "@/helpers";

const t = (message, data) => translation("orders." + message, data);

export const getTradeType = () => {
  let types = [ t("all"), t("type.buy"), t("type.sell")];
  return types;
};
