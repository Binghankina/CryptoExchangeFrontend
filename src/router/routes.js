export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/_home.vue")
  },
  {
    path: "/exchange",
    name: "ExchangePro",
    component: () => import("@/views/_exchange.vue")
  },
  {
    path: "/aboutus",
    name: "Aboutus",
    component: () => import("@/views/_aboutus.vue")
  },
  {
    path: "/c2c",
    name: "C2C",
    component: () => import("@/views/_c2c.vue")
  },
  {
    path: "/c2ccreate",
    name: "C2CCreate",
    component: () => import("@/views/_c2c_create.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/c2corder",
    name: "C2COrder",
    component: () => import("@/views/_c2c_order.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/c2cbuy/:id",
    name: "C2CBuy",
    component: () => import("@/views/_c2c_buy.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/c2cappeal",
    name: "C2CAppeal",
    component: () => import("@/views/_c2c_appeal.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/announcement",
    name: "Announcement",
    component: () => import("@/views/_announcement.vue")
  },
  {
    path: "/projectcenter",
    name: "ProjectCenter",
    component: () => import("@/views/_projectcenter.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/_signin.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/_signup.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/account",
    name: "account",
    component: () => import("@/views/_account.vue"),
    children: [
      {
        path: "information",
        component: () => import("@/views/account/_information.vue")
      },
      {
        path: "security",
        component: () => import("@/views/account/_security.vue")
      },
      {
        path: "kyc",
        component: () => import("@/views/account/_kyc.vue")
      },
      {
        path: "history",
        component: () => import("@/views/account/_history.vue")
      },
      {
        path: "c2c",
        component: () => import("@/views/account/_c2c.vue")
      },
      {
        path: "api",
        component: () => import("@/views/account/_api.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/assets",
    component: () => import("@/views/_assets.vue"),
    children: [
      {
        path: "balance",
        component: () => import("@/views/assets/balance/index.vue")
      },
      {
        path: "history",
        component: () => import("@/views/assets/_history.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/exchange_record",
    component: () => import("@/views/_exchange_record.vue"),
    children: [
      {
        path: "open",
        component: () => import("@/views/exchange_record/_open.vue")
      },
      {
        path: "history",
        component: () => import("@/views/exchange_record/_history.vue")
      },
      {
        path: "transaction",
        component: () => import("@/views/exchange_record/_transaction.vue")
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/confirmation/email",
    name: "ConfirmEmail",
    component: () => import("@/views/_confirmemail.vue"),
    meta: {
      onlyWait: true
    }
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: () => import("@/views/_forgotpassword.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: () => import("@/views/_resetpassword.vue"),
    meta: {
      requiresTokenReset: true
    }
  },
  {
    path: "/m/",
    name: "Index",
    component: () => import("@/views/mobile/Index.vue")
  },
  {
    path: "/m/tradingCenter",
    name: "TradingCenter",
    component: () => import("@/views/mobile/TradingCenter")
  },
  {
    path: "/m/c2c",
    name: "MC2C",
    component: () => import("@/views/mobile/C2C")
  },
  {
    path: "/m/c2cappeal",
    name: "MC2CAppeal",
    component: () => import("@/views/mobile/C2CAppeal")
  },
  {
    path: "/m/user",
    name: "User",
    component: () => import("@/views/mobile/User"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/m/login",
    name: "Login",
    component: () => import("@/views/mobile/Login")
  },
  {
    path: "/m/assets",
    name: "Assets",
    component: () => import("@/views/mobile/Assets"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/m/announcement",
    name: "MAnnouncement",
    component: () => import("@/views/mobile/Announcement")
  },
  {
    path: "/m/register",
    name: "Register",
    component: () => import("@/views/mobile/Register")
  },
  {
    path: "/m/app",
    name: "APPDownload",
    component: () => import("@/views/mobile/App")
  }
];
