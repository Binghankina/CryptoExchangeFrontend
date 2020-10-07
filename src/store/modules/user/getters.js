import { translation } from "@/helpers";

const t = (message, data) => translation("usercenter." + message, data);
var role = new Map();
var level = new Map();
role.set('admin', '超级管理员');
role.set('admin', '高级管理员');
role.set('accountant', '普通管理员');
role.set('member', '普通用户');

export default {
  isLoggedIn: state => state.status === "success",
  authStatus: state => state.status,
  getBalance: state => state.balance,
  getAccountInformation: state => [
    {
      name: "UID",
      type: "text",
      desc: ``,
      value: state.uid
    },
    {
       name: t("account_information.rows.phone.name"),
       type: "text",
       desc: t("account_information.rows.phone.desc"),
       value: state.mobile
    },
    {
       name: t("account_information.rows.role.name"),
       type: "text",
       desc: "",
       value: role.get(state.role)
    },
    {
      name: t("account_information.rows.level.name"),
      type: "text",
      desc: t("account_information.rows.level.desc"),
      value: "KYC-"+state.level
    }
  ],
  getAccountSecurity: state => [
    {
      status: true,
      name: t("account_security.rows.psw.name"),
      desc: t("account_security.rows.psw.desc"),
      action: {
        allow: true,
        text: t("account_security.rows.psw.action"),
        runner: "password"
      }
    },
    // {
    //   status: true,
    //   name: t("account_security.rows.apsw.name"),
    //   desc: t("account_security.rows.apsw.desc"),
    //   action: {
    //     allow: true,
    //     text: t("account_security.rows.apsw.action"),
    //     runner: "assetpassword"
    //   }
    // }
    // {
    //   status: state.otp,
    //   name: t("account_security.rows.otp.name"),
    //   desc: t("account_security.rows.otp.desc"),
    //   action: {
    //     allow: !state.otp,
    //     text: t("account_security.rows.otp.action"),
    //     runner: "2fa"
    //   }
    // }
  ]
};
