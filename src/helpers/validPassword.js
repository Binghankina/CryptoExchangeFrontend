// const regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
//const regex = /^(?![0-9]+$)[\x20-\x7e]{8,20}$/
const regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/
export const validPassword = (password, repassword = null) => {
  if (repassword) return !(repassword === password);
  if (!password) return false;
  return !regex.test(password);
};
