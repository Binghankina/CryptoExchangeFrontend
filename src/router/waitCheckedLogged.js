import store from "@/store";

const waitCheckedLogged = callback => {
  if (store.getters["user/authStatus"] !== "loading") {
    callback();
  } else {
    setTimeout(() => {
      waitCheckedLogged(callback);
    }, 10);
  }
};

export default waitCheckedLogged;
