export default {
  status: "",
  email: null,
  level: 0,
  otp: false,
  uid: null,
  need2fa: false,
  checkLogged: false,
  balance: [],
  session: {
    sended_email: false
  },
  activity: {
    loading: false,
    max: 0,
    array: [],
    page: 1
  },
  api_keys: {
    loading: false,
    max: 0,
    array: [],
    page: 1
  },
  phone: {
    number: null,
    country: null,
    validated: false
  },
  labels: [],
  alipay: '',
  alipay_name: '',
  bank_address: '',
  bank_name: '',
  bank_number: '',
  bank_user_name: '',
  tx_pw: false
};
