import store from "../store";

export const emailEncode = () => {
  const email = store.state.user.email;
  let reEmail = email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => {
    for (let i = 0; i < gp3.length; i++) {
      if (gp2.length <= 4) {
        gp2 += "*";
      }
    }
    return gp2;
  });
  return reEmail.replace("@", "");
};
