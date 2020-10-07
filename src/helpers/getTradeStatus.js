import { translation } from "@/helpers";

const t = (message, data) => translation("orders." + message, data);

export const getTradeStatus = () => {
  let status = [ 
     t("all"), 
     t("status.wait"), 
     t("status.done"), 
     t("status.cancel") 
  ];
  return status;
};
