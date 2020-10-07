import backend from "./backend";
import datepicker from "./datepicker";
import message from "./message";
import modal from "./modal";

export default {
  locale: "en-US",
  name: "English",
  status: {
    error: "Error",
    warning: "Warning",
    success: "Success",
    info: "Info"
  },
  header: {
    login: "Log In",
    register: "Sign Up",
    my_assets: "My Assets",
    orders: "Orders",
    open_orders: "Open Orders",
    order_history: "Order History",
    trade_history: "Trade History",
    user_center: "Account Settings",
    user: {
      name:"User",
      account_information:"Account Information",
      account_security: "Account Security",
      password_change: "Login Password",
      trade_password: "Assets Password",
      kyc_account_verification: "KYC Account verification",
      c2c: "C2C Settings",
      login_history: "Login History",
      language: "Language",
      logout: "Logout"
    },
    action:{
      modify:"Modify",
      setting:"Settings"
    },
    exchange: "Exchange",
    project_center: "Project Center"
  },
  footer: {
    title: "Contact Us",
    service: "Customer Service",
    business: "Business Cooperation",
    about_us: "About us",
    user_privacy: "User privacy",
    download_the_app: "App Download"
  },
  footer_m: {
    markets: "Markets",
    exchange: "Exchange",
    c2c: "C2C",
    assets: "Assets",
    account: "Account",
  },
  button:{
    back: "Back"
  },
  auth: {
    login: "Log In",
    register: "Sign Up",
    confirm: "Confirm",
    forgot_password: "Forgot Password",
    no_account: "No account? {0}",
    to_sign_up: "To sign up!",
    input_error: {
      email: "Incorrect email address. Please enter again.",
      password:
        "8-20 characters, not pure Numbers.",
      repassword: "The two passwords are different. Please re-enter.",
      refid: "Please enter correct referral ID"
    },
    mobile_phone_register: "Mobile",
    countries_or_regions_cannot_be_modified_after_registration: "Countries or regions cannot be modified after registration",
    verification_code: "Verification code",
    get_verification_code: "Verification",
    regain: "regain",
    i_have_read_and_agree: "I have read and agree",
    user_agreement_and_privacy_policy: "User agreement and privacy policy"
  },
  history: {
    succeed: "success",
    failed: "failure",
    login: "Login"
  },
  //Form placeholder
  placeholder: {
    email: "Email",
    mobile: "Mobile Number",
    mobileandemail : " Email or Mobile Number",
    password: "Password",
    repassword: "Confirm Password",
    refid: "Referral uid",
    old_password: "Old Password",
    new_password: "New Password",
    "2fa_code": "2FA Code"
  },
  //Header table
  table: {
    announcement: "Announcement",
    status: "Status",
    name: "Name",
    date: "Date",
    time: "Time",
    pair: "Pair",
    pair_volume: "Pair / Volume",
    coin: "Coin",
    infomation: "Infomation",
    last_price: "Last Price",
    price: "Price",
    market: "Market",
    change: "Change",
    volume: "Volume",
    sum: "Sum",
    amount: "Amount",
    total: "Total",
    executed: "Executed",
    unexecuted: "Unexecuted",
    avg_price: "Average Price",
    side: "Side",
    type: "Type",
    filled: "Filled%",
    cancel: "Cancel",
    h_change: "24h Change",
    h_high: "24h High",
    h_low: "24h Low",
    h_volume: "24h Volume",
    ip_address: "IP Address",
    action: "Action",
    available: "Available",
    locked: "Locked",
    btc_val: "BTC Valuation",
    search: "Search",
    kid: "Kid",
    created: "Created",
    u_not_have_any_transaction: "you don't have any transaction",
    start_date: "start date",
    end_date: "end date",
    query: "Query"
  },
  action: {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    exchange: "Exchange"
  },
  market_list: {
    favorite: "Favorite",
    market: "{market} Market"
  },
  exchange: {
    card_head: {
      chart: "Chart",
      candle: "Candle",
      depth: "Depth",
      market_trades: "Market Trades",
      open_orders: "Open Orders",
      history_orders: "History Orders",
      history_trades: "History Trades",
      limit_order: "Limit Order"
    },
    status: {
      change: "Change",
      high: "High",
      low: "Low",
      h_change: "24h Change",
      h_high: "24h High",
      h_low: "24h Low",
      h_volume: "24h Volume",
    },
    entry: {
      price: "PRICE",
      amount: "AMOUNT",
      total: "Total",
      sell: "Sell {currency}",
      buy: "Buy {currency}",
      error: "Please enter correct amount"
    },
    balance: {
      available: "Available",
      locked: "Locked",
      unauth: "{0} or {1} to trade"
    }
  },
  assets: {
    balance: "Balance",
    history_record: "History",
    address: "Address",
    txid: "Txid",
    hidesmall: "Hide Small Balances",
    total_assets_calc: "Estimated Value",
    instructions: "Instructions:",
    deposit: {
      deposit_address: "Deposit address:",
      copy: "Copy",
      qr_code: "QR Code",
      browser: "Block Browser",
      note: `
        • Min. Deposit Amount: {min_deposit_amount} {currency}
        {0}
        • {min_confirmations} network confirmations are required to deposit, send only {currency} to this address.Sending any other currency to this address may result in the loss of your deposit.
        {0}
        • Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.
      `
    },
    withdraw: {
      amount: "Amount",
      available: "Available:",
      fee: "Fee",
      receive_amount: "Receive Amount",
      note: `
        • Minimum withdrawal amount: {min_withdraw_amount} {currency}.
        {0}
        • To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.
        {0}
        • Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.
      `,
      submit: "Withdraw"
    },
    history: {
      state: {
        completed: "Completed",
        processing: "Processing ({confirmations}/{min_confirmations})"
      }
    }
  },
  orders: {
    open: {
      title: "Open Orders",
      empty: "You don't have any open order"
    },
    history: {
      title: "Order History",
      empty: "You don't have any order"
    },
    transaction: {
      title: "Trade History",
      empty: "You don't have any trade"
    },
    empty_second: "Go to the Trade tab and make your order!",
    all:"All",
    status: {
      wait: "Waiting",
      done: "Filled",
      cancel: "Canceled"
    },
    type: {
      buy:"Buy",
      sell:"Sell"
    }
  },
  usercenter: {
    account_information: {
      title: "Account information",
      rows: {
        email: {
          name: "Email",
          desc:
            "Used to withdraw, retrieve passwords, modify security settings and other operations."
        },
        phone: {
          name: "Phone",
          desc: "Used to withdraw, retrieve passwords, modify security settings and other operations."
        },
        role: {
          name: "User Role",
          desc: "User's management role。"
        },
        level: {
          name: "KYC Level",
          desc: "Please perform KYC to enhance your level, C2C and withdraw features require KYC-2."
        },
        setting: "setting"
      }
    },
    account_security: {
      title: "Account Security",
      rows: {
        psw: {
          name: "Login Password",
          desc: `Used for account login.(8-20 characters, not pure Numbers.)`,
          action: "Change password"
        },
        otp: {
          name: "Google Authenticator",
          desc: `Recommended to be used for withdrawal & password & security settings modifications.`,
          action: "Setting"
        },
        apsw: {
          name: "Asset Password",
          desc: `You need to verify the asset password when your account has asset changes. (8-20 characters, contains at least 1 uppercase and 1 lower letter and 1 number)`,
          action: "Set",
          change: "Change"
        }
      }
    },
    KYC_account_verification: {
     title: "KYC Account verification",
     country_region: "Country / Region",
     first_name: "First Name",
     last_name: "Last name",
     type_of_certificate: "Type of certificate",
     ID_number: "ID Number",
     ID_photo: "ID Photo",
     ID_photo_front: "ID Photo - Front",
     ID_photo_back: "ID Photo - Back",
     ID_photo_hold: "ID Photo - Hold",
     please_enter_your_first_name: "Please enter your first name",
     please_enter_your_last_name: "Please enter your last name",
     please_enter_your_ID_Number: "Please enter your ID Number",
     click_to_upload_the_front_side_of_the_ID_photo: "Click to upload the front side of the ID photo",
     avatar_ID_number_gender_address_etc_need_to_be_clear: "Avatar, ID number, gender, address, etc. need to be clear",
     click_to_upload_the_back_side_of_the_ID_photo: "Click to upload the back side of the ID photo",
     issuing_authority_the_effective_date_need_to_be_clear: "Issuing authority, the effective date need to be clear",
     upload_a_hand_held_ID_photo: "Upload a hand-held ID photo",
     hand_held_ID_photo_standards: "Hand-held ID photo standards",
     The_character_avatar_is_clear: "The character avatar is clear",
     The_identity_document_information_is_clear: "The identity document information is clear",
     submit: "Submit",
     passport: "Passport",
     identity_card: "Identity card",
     driver_license: "Driver license",
     utility_bill: "Utility Bill",
     status_uploaded:"The KYC application has been submitted, please waiting for the administrator to verify.",
     status_verified:"The KYC application has been approved.",
     status_failed:"The KYC application has been rejected, please submit again.",
     argentina:"Argentina",
     australia:"Australia",
     austria:"Austria",
     belgium:"Belgium",
     brazil:"Brazil",
     canada:"Canada",
     chile:"Chile",
     china:"China",
     croatia:"Croatia",
     cyprus:"Cyprus",
     denmark:"Denmark",
     egypt:"Egypt",
     estonia:"Estonia",
     fiji:"Fiji",
     finland:"Finland",
     france:"France",
     germany:"Germany",
     greece:"Greece",
     hongkong:"Hong Kong",
     hungary:"Hungary",
     iceland:"Iceland",
     india:"India",
     indonesia:"Indonesia",
     ireland:"Ireland",
     italy:"Italy",
     japan:"Japan",
     kazakhstan:"Kazakhstan",
     korea:"Republic of Korea",
     luxembourg:"Luxembourg",
     macao:"Macao",
     malaysia:"Malaysia",
     malta:"Malta",
     mexico:"Mexico",
     mongolia:"Mongolia",
     netherlands:"Netherlands",
     newzealand:"New Zealand",
     norway:"Norway",
     philippines:"Philippines",
     poland:"Poland",
     portugal:"Portugal",
     qatar:"Qatar",
     russia:"Russia",
     singapore:"Singapore",
     spain:"Spain",
     sweden:"Sweden",
     switzerland:"Switzerland",
     taiwan:"Taiwan, Province of China",
     thailand:"Thailand",
     unitedkingdom:"United Kingdom",
     unitedstates:"United States",
     vietnam:"Vietnam"
    },
    login_history: {
      title: "Login History"
    },
    api: {
      title: "API"
    },
    c2c: {
      title: "C2C Settings",
      alipay: "AliPay",
      real_name: "Real Name",
      alipay_account: "AliPay Account",
      assets_password: "Assets Password",
      add: "Add",
      bank: "Bank Card",
      bank_name: "Bank Name",
      address: "Branch",
      account_name: "Name",
      bank_num: "Account Number",
      change: "Modify",
      sell: "OXT Sell",
      buy: "OXT Buy",
      publish: "Publish Advertisement",
      management: "My C2C Trades",
      advertiser: "Advertiser",
      payment: "Payment method",
      price: "Price",
      limit: "Limit",
      action: "Action",
      purchase: "Buy",
      amount: "Amount",
      contact: "Contact Info",
      kyc:"Perform KYC",
      create_ad:{
        title: "Create Advertisment",
        desc:"Created Ads could be edited and deleted in My C2C Ads.",
        kyc_desc:"For your safety, only KYC-2 user can perform C2C trades.",
        buy_desc:"After the advertisement is publised, if there is a willing buyer，he will contact you offline.",
        type:"Type",
        sell:"Sell",
        buy:"Buy",
        coin_name:"Coin Name",
        country:"Country",
        fiat:"Fiat Type",
        price:"Price",
        upperlimit:"Selling Amount(Upper Limit)",
        lowerlimit:"Selling Amount(lower Limit)",
        expected_amount:"Expected Purchase Amount",
        contact:"Contact Info or Comments",
        publish:"Publish",
      },
      buy_order:{
        title:"Order Summary",
      },
      placeholder:{
        coin_name:"Please choose coin",
        country:"Please choose country",
        fiat:"Please choose curreny"
      }
    },
    sure: "Confirm"
  },
  aboutus: {
    aboutus: "ABOUT US",
    aboutGIH: "About GIH",
    features: "Characteristic",
    privacy: "PRIVACY",
    privacy_statement: "Privacy Statement"
  },
  ...backend,
  datepicker,
  message,
  modal
};
