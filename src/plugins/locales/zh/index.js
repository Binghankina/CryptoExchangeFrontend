import backend from "./backend";
import datepicker from "./datepicker";
import message from "./message";
import modal from "./modal";
import { Level } from "chalk";

export default {
  locale: "zh",
  name: "中文",
  status: {
    error: "错误",
    warning: "警告",
    success: "成功",
    info: "信息"
  },
  header: {
    login: "登陆",
    register: "注册",
    my_assets: "我的资产",
    orders: "委托",
    open_orders: "当前委托",
    order_history: "历史委托",
    trade_history: "历史交易",
    user_center: "账户中心",
    user: {
      name:"用户",
      account_information: "账户信息",
      account_security: "账户安全",
      password_change: "修改密码",
      trade_password: "资金密码",
      kyc_account_verification: "KYC账户验证",
      c2c: "C2C交易设置",
      login_history: "登录历史",
      language: "语言设置",
      logout: "退出登录"
    },
    action:{
      modify:"修改",
      setting:"设置"
    },
    exchange: "交易中心",
    project_center: "项目中心 "
  },
  footer: {
    title: "联系我们",
    service: "客服",
    business: "商务",
    about_us: "关于我们",
    user_privacy: "用户隐私",
    download_the_app: "Android app 下载"
  },
  footer_m: {
    markets: "市场行情",
    exchange: "交易中心",
    c2c: "C2C",
    assets: "我的资产",
    account: "我的账户",
  },
  button:{
    back: "返回"
  },
  auth: {
    login: "登录",
    register: "注册",
    confirm: "确认",
    forgot_password: "忘记密码",
    reset_password: "重置密码",
    no_account: "没有账户? {0}",
    to_sign_up: "请注册!",
    input_error: {
      email: "Email地址不正确，请重新输入。",
      password:
        "8-20个字符，不可以是纯数字",
      repassword: "两次密码输入不相同，请重新输入。",
      refid: "请输入正确的邀请人ID"
    },
    mobile_phone_register: "手机号码",
    countries_or_regions_cannot_be_modified_after_registration: "国家或者地区注册后不能修改",
    verification_code: "验证码",
    get_verification_code: "获取验证码",
    regain: "重新获取",
    i_have_read_and_agree: "我已阅读并同意",
    user_agreement_and_privacy_policy: "用户协议及隐私政策"
  },
  history: {
    succeed: "成功",
    failed: "失败",
    login: "登录成功"
  },
  //Form placeholder
  placeholder: {
    email: "邮箱",
    mobile: "手机",
    mobileandemail : "邮箱或手机",
    password: "密码",
    repassword: "再次输入密码",
    refid: "邀请人ID",
    old_password: "输入原密码",
    new_password: "输入新密码",
    "2fa_code": "2FA代码"
  },
  //Header table
  table: {
    announcement: "公告",
    status: "状态",
    name: "名字",
    pair_volume: "交易对 / 交易量",
    date: "日期",
    time: "时间",
    pair: "交易对",
    coin: "代币",
    infomation: "信息",
    last_price: "最新价",
    price: "价格",
    market: "市场",
    change: "涨跌",
    volume: "交易量",
    sum: "成交额",
    amount: "数量",
    total: "合计",
    executed: "已执行的",
    unexecuted: "未执行的",
    avg_price: "平均价格",
    side: "方向",
    type: "类型",
    filled: "成交%",
    cancel: "撤销",
    h_change: "24h涨跌",
    h_high: "24h最高价",
    h_low: "24h最低价",
    h_volume: "24h交易量",
    ip_address: "IP地址",
    action: "进行交易",
    available: "可用",
    locked: "锁定",
    btc_val: "BTC估值",
    search: "搜索",
    kid: "Kid",
    created: "已创建",
    u_not_have_any_transaction: "暂无交易记录",
    start_date: "开始日期",
    end_date: "结束日期",
    query: "查询"
  },
  action: {
    deposit: "充值",
    withdrawal: "转出",
    exchange: "交易"
  },
  market_list: {
    favorite: "自定义",
    market: "{market}市场"
  },
  exchange: {
    card_head: {
      chart: "行情",
      candle: "K线图",
      depth: "深度图",
      market_trades: "交易历史",
      open_orders: "当前委托",
      history_orders: "历史委托",
      history_trades: "历史交易",
      limit_order: "限价"
    },
    status: {
      change: "涨跌幅",
      high: "最高",
      low: "最低",
      h_change: "24h涨跌",
      h_high: "24h最高价",
      h_low: "24h最低价",
      h_volume: "24h交易量",
    },
    entry: {
      price: "价格",
      amount: "数量",
      total: "总计",
      sell: "卖出 {currency}",
      buy: "买入 {currency}"
    },
    balance: {
      available: "可用余额",
      locked: "下单冻结",
      unauth: "{0} 或 {1} 交易"
    }
  },
  assets: {
    balance: "资产",
    history_record: "历史记录",
    address: "地址",
    txid: "Txid",
    hidesmall: "隐藏小额资产",
    total_assets_calc: "估值",
    instructions: "说明:",
    deposit: {
      deposit_address: "充值地址:",
      copy: "复制",
      qr_code: "QR码",
      browser: "区块浏览器",
      note: `
        • 最小充值数额: {min_deposit_amount} {currency}
        {0}
        • 使用{currency}地址充值需要{min_confirmations}个网络确认才能到账。禁止向{currency}地址充值除{currency}之外的资产，任何充入{currency}地址的非{currency}资产将不可找回。
      `
    },
    withdraw: {
      amount: "数量",
      available: "可用转出代币数量:",
      fee: "费用",
      receive_amount: "接收数量",
      note: `
        • 最小代币转出数量: {min_withdraw_amount} {currency}.
        {0}
        • 为了确保您的资产安全，您的代币转出请求需要人工复核。
      `,
      submit: "转出"
    },
    history: {
      state: {
        completed: "完成",
        processing: "正在处理中 ({confirmations}/{min_confirmations})"
      }
    }
  },
  orders: {
    open: {
      title: "当前委托",
      empty: "暂无当前委托"
    },
    history: {
      title: "历史委托",
      empty: "暂无当前委托"
    },
    transaction: {
      title: "历史交易",
      empty: "暂无历史交易"
    },
    empty_second: "前往交易页面进行交易",
    all:"全部",
    status: {
      wait: "未完成",
      done: "已完成",
      cancel: "已取消"
    },
    type: {
      buy:"买入",
      sell:"卖出"
    }
  },
  usercenter: {
    account_information: {
      title: "账户信息",
      rows: {
        email: {
          name: "邮箱",
          desc: "接收代币转出、修改密码安全和其他设定相关信息。"
        },
        phone: {
          name: "手机",
          desc: "接收代币转出、修改密码安全和其他设定相关信息。"
        },
        role: {
          name: "用户等级",
          desc: "用户的管理权限等级。"
        },
        level: {
          name: "KYC等级",
          desc: "请进行KYC验证提升KYC等级，C2C代币转出需要KYC-2等级才可进行。"
        }
      },
      setting: "设置"
    },
    account_security: {
      title: "账户安全",
      rows: {
        psw: {
          name: "登录密码",
          desc: `用于账户登录（密码需为8-20个字符不能是纯数字）`,
          action: "修改密码"
        },
        otp: {
          name: "Google Authenticator",
          desc: `Recommended to be used for withdrawal & password & security settings modifications.`,
          action: "Setting"
        },
        apsw: {
          name: "资金密码",
          desc: `账户资金密码（密码需为8-20个字符，需包含至少一个大小写字母和数字）`,
          action: "设定",
          change: "更改"
        }
      }
    },
    KYC_account_verification: {
      title: "KYC账户验证",
      country_region: "国家/地区",
      first_name: "名字",
      last_name: "姓氏",
      type_of_certificate: "证件类型",
      ID_number: "证件号码",
      ID_photo: "证件照片",
      ID_photo_front: "证件照片正面",
      ID_photo_back: "证件照片背面",
      ID_photo_hold: "手持证件照片",
      please_enter_your_first_name: "请输入您的名字",
      please_enter_your_last_name: "请输入您的姓氏",
      please_enter_your_ID_Number: "请输入您的证件号码",
      click_to_upload_the_front_side_of_the_ID_photo: "点击上传证件正面照片",
      avatar_ID_number_gender_address_etc_need_to_be_clear: "头像、号码、性别、地址等必须清晰",
      click_to_upload_the_back_side_of_the_ID_photo: "点击上传证件背面照片",
      issuing_authority_the_effective_date_need_to_be_clear: "发行机构、有效日期必须清晰",
      upload_a_hand_held_ID_photo: "上传手持证件照片",
      hand_held_ID_photo_standards: "手持证件照标准",
      The_character_avatar_is_clear: "用户头像必须清晰",
      The_identity_document_information_is_clear: "证件信息必须清晰",
      submit: "提交",
      passport: "护照",
      identity_card: "身份证",
      driver_license: "驾驶执照",
      utility_bill: "账单",
      status_uploaded:"KYC申请已经提交，请等待员工复核。",
      status_verified:"KYC申请已经通过。",
      status_failed:"KYC申请失败，请重新提交资料。",
      argentina:"阿根廷",
      australia:"澳大利亚",
      austria:"奥地利",
      belgium:"比利时",
      brazil:"巴西",
      canada:"加拿大",
      chile:"智利",
      china:"中国",
      croatia:"克罗地亚",
      cyprus:"塞浦路斯",
      denmark:"丹麦",
      egypt:"埃及",
      estonia:"爱沙尼亚",
      fiji:"斐济",
      finland:"芬兰",
      france:"法国",
      germany:"德国",
      greece:"希腊",
      hongkong:"中国香港",
      hungary:"匈牙利",
      iceland:"冰岛",
      india:"印度",
      indonesia:"印度尼西亚",
      ireland:"爱尔兰",
      italy:"意大利",
      japan:"日本",
      kazakhstan:"哈萨克斯坦",
      korea:"韩国",
      luxembourg:"卢森堡",
      macao:"澳门",
      malaysia:"马来西亚",
      malta:"马耳他",
      mexico:"墨西哥",
      mongolia:"蒙古",
      netherlands:"荷兰",
      newzealand:"新西兰",
      norway:"挪威",
      philippines:"菲律宾",
      poland:"波兰",
      portugal:"葡头牙",
      qatar:"卡塔尔",
      russia:"俄罗斯",
      singapore:"新加坡",
      spain:"西班牙",
      sweden:"瑞典",
      switzerland:"瑞士",
      taiwan:"中国台湾",
      thailand:"泰国",
      unitedkingdom:"英国",
      unitedstates:"美国",
      vietnam:"越南"

    },
    login_history: {
      title: "登录历史"
    },
    api: {
      title: "API"
    },
    c2c: {
      title: "C2C 交易设置",
      alipay: "支付宝",
      real_name: "真实姓名",
      alipay_account: "支付宝账号",
      assets_password: "资金密码",
      add: "添加",
      bank: "银行卡",
      bank_name: "银行名称",
      address: "所在支行",
      account_name: "开户姓名",
      bank_num: "银行卡号",
      change: "修改",
      sell: "OXT售卖区",
      buy: "OXT求购区",
      publish: "发布售卖广告",
      management: "管理我的交易",
      advertiser: "广告方",
      payment: "付款方式",
      price: "价格",
      limit: "限额",
      action: "操作",
      purchase: "购买",
      amount: "数量",
      contact: "联系方式",
      kyc: "进行KYC",
      create_ad:{
        title: "创建广告",
        desc:"已创建的广告可以在我的广告中进行编辑和删除",
        kyc_desc:"为维持平台秩序，只有经过认证的KYC-2用户才能进行C2C交易",
        buy_desc:"此广告发布成功后，如有卖家有意向，会联系你线下完成交易",
        type:"广告类型",
        sell:"在线出售",
        buy:"在线求购",
        coin_name:"虚拟货币名称",
        country:"国家",
        fiat:"交易货币",
        price:"交易价格",
        upperlimit:"出售数量上限",
        lowerlimit:"出售数量下限",
        expected_amount:"预计购买数量",
        contact:"联系方式及备注",
        publish:"发布",
      },
        buy_order:{
          title:"基本信息",
        },
      placeholder:{
        coin_name:"请选择交易币种",
        country:"请选择国家",
        fiat:"请选择货币"
      }
    },
    sure: "确定"
  },
  aboutus: {
    aboutus: "关于我们",
    aboutGIH: "关于GIH",
    features: "特点",
    privacy: "用户隐私",
    privacy_statement: "隐私声明"
  },
  ...backend,
  datepicker,
  message,
  modal
};
