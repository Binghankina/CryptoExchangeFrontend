export default {
  //Auth Message
  "resource.labels.private": "无法更新标签",
  "resource.user.no_activity": "无新记录的活动",
  "resource.profile.not_exist": "用户不存在",
  "resource.profile.exist": "用户已经存在",
  "resource.api_key.2fa_disabled": "只有启用2FA的用户才可进行操作",
  "resource.api_key.missing_otp":
    "该账户已经启用2FA，但OTP code确实",
  "resource.api_key.invalid_otp": "OTP code无效",
  "resource.phone.twillio": "Twilio客户端出错",
  "resource.phone.invalid_num": "电话号码无效",
  "resource.phone.exists": "电话号码已存在",
  "resource.phone.number_exist": "电话号码已存在",
  "resource.phone.verification_invalid":
    "验证码错误",
  "resource.documents.limit_reached":
    "到达文件数上限",
  "resource.documents.uploaded":
    "文件上传成功",
  "resource.documents.limit_will_be_reached":
    "文件数量到达到达上传上限",
  "resource.otp.already_enabled":
    "该用户2FA已经启用",
  "resource.otp.invalid": "OTP code无效",
  "resource.password.doesnt_match": "密码不匹配",
  "resource.password.prev_pass_not_correct": "旧密码不正确",
  "resource.password.no_change_provided":
    "新密码与旧密码不能相同",
  "resource.document.empty_doc_expire": "到期日无效",
  "resource.document.empty_first_name": "缺少名字",
  "resource.document.empty_last_name": "缺少姓氏",
  "resource.document.empty_doc_number": "缺少证件号码",
  "password.requirements": "密码不符合要求",
  "password.password.password_strength": "密码强度弱",

  "email.taken": "Email已经存在",

  "identity.user.invalid_referral_format": "无效的推荐账户",
  "identity.user.referral_doesnt_exist": "推荐账户不存在",
  "identity.user.active_or_doesnt_exist":
    "用户不存在或已经激活",
  "identity.password.user_doesnt_exist": "用户不存在",
  "identity.user.passwords_doesnt_match": "密码不匹配",
  "identity.user.utilized_token": "JWT已经被使用",
  "identity.session.invalid_login_params": "用户名或密码错误",
  "identity.session.invalid": "无效的Session",
  "identity.captcha.required": "需要captcha",
  "identity.captcha.mandatory_fields": "请输入必填项目",
  "identity.session.not_active": "账户没有激活",
  "identity.session.banned": "账户被锁定",
  "identity.session.invalid_params": "用户名或密码错误",
  "identity.session.missing_otp":
    "缺少otp",
  "identity.session.invalid_otp": "OTP code无效",
  "identity.sms.too_many_req": "请求过于频繁",

  "first_name.invalid": "名字无效",
  "last_name.invalid": "姓氏无效",
  "city.invalid": "城市无效",
  "postcode.invalid": "邮编无效",
  "address.invalid": "地址无效",
  "first_name.blank": "缺少名字",
  "last_name.blank": "缺少姓氏",
  "dob.blank": "出生日期无效",
  "address.blank": "缺少地址",
  "city.blank": "缺少城市",
  "country.blank": "缺少国家",
  "postcode.blank": "缺少邮编",
  "country.must have alpha2 or alpha3 format":
    "国家格式错误",

  "totp.error": "OTP code无效",

  "record.not_found": "用户未找到",
  "jwt.decode_and_verify": "JWT验证错误",
  "authz.invalid_session": "无效的Session",
  "authz.user_not_active": "用户未激活",
  "authz.invalid_signature": "API Key header中的'signature'参数无效",
  "authz.apikey_not_active": "API Key状态为'inactive",
  "authz.disabled_2fa": "API Key所有者已经停用2FA",
  "authz.invalid_api_key_headers": "API Key headers无效",
  "authz.permission_denied": "没有权限",
  "authz.unexistent_apikey": "X-Auth-Apikey header无效",

  // validation errors
  // identity module
  "identity.user.missing_email": "Email缺失",
  "identity.user.empty_email": "Email为空",
  "identity.user.empty_mobile": "手机号码为空",
  "identity.user.missing_password": "密码缺失",
  "identity.user.empty_password": "密码为空",
  "identity.user.missing_token": "Token缺失",
  "identity.user.empty_token": "Token为空",
  "identity.user.missing_reset_password_token":
    "充值密码的token缺失",
  "identity.user.empty_reset_password_token":
    "充值密码的token为空",
  "identity.user.missing_confirm_password": "未输入重复密码",
  "identity.user.empty_confirm_password":
    "未输入重复密码",

  "identity.session.missing_emai": "Email缺失",
  "identity.session.missing_password": "密码缺失",
  "identity.session.invalid_captcha_format": "无效的captcha格式",

  // resource module
  "resource.otp.missing_code": "验证代码缺失",
  "resource.otp.empty_code": "验证代码为空",

  "resource.labels.missing_key": "某个键缺失",
  "resource.labels.empty_key": "某个键缺失",
  "resource.labels.missing_value": "某个值缺失",
  "resource.labels.empty_value": "某个值为空",

  "resource.documents.missing_doc_expire":
    "Documents expiration date is missing",
  "resource.documents.empty_doc_expire":
    "Documents expiration date is missing or empty",
  "resource.documents.missing_doc_type": "Documents type is missing",
  "resource.documents.empty_doc_type": "Documents type is missing or empty",
  "resource.documents.missing_doc_number": "Documents number is missing",
  "resource.documents.empty_doc_number": "Documents number is missing or empty",
  "resource.documents.missing_upload": "Attachment is missing",

  "resource.user.missing_topic": "Topic is missing",
  "resource.user.empty_topic": "Topic is missing or empty",
  "resource.user.missing_old_password": "Old password is missing",
  "resource.user.empty_old_password": "Old password is missing or empty",
  "resource.user.missing_new_password": "New password is missing",
  "resource.user.empty_new_password": "New password is missing or empty",
  "resource.user.missing_confirm_password": "Confirm password is missing",
  "resource.user.empty_confirm_password":
    "Confirm password is missing or empty",

  "resource.profile.missing_first_name": "缺少名字",
  "resource.profile.missing_last_name": "缺少姓氏",
  "resource.profile.missing_dob": "缺少生日",
  "resource.profile.missing_address": "缺少地址",
  "resource.profile.missing_postcode": "缺少邮编",
  "resource.profile.missing_city": "缺少城市",
  "resource.profile.missing_country": "缺少国家",

  "resource.api_key.missing_algorithm": "算法缺失",
  "resource.api_key.empty_algorithm": "算法为空",
  "resource.api_key.empty_kid": "KID is missing or empty",
  "resource.api_key.empty_scope": "Scope is missing or empty",
  "resource.api_key.missing_totp": "TOTP code is missing",
  "resource.api_key.empty_totp": "TOTP code is missing or empty",
  "resource.api_key.missing_kid": "KID is missing",
  "resource.api_key.empty_state": "State is missing or empty",

  "resource.phone.missing_phone_number": "电话号码缺失",
  "resource.phone.empty_phone_number": "电话号码为空",
  "resource.phone.missing_verification_code": "验证码缺失",
  "resource.phone.empty_verification_code":
    "验证码为空",

  // peatio
  "account.currency.doesnt_exist": "代币不存在",
  "account.deposit.invalid_state": "充值状态无效",
  "account.deposit.non_integer_limit":
    "充值限额必须为整数",
  "account.deposit.invalid_limit": "限额无效",
  "account.deposit.non_positive_page": "充值错误",
  "account.deposit.empty_txid": "Txid为空",
  "account.deposit_address.invalid_address_format":
    "无效的充值地址",
  "account.deposit_address.doesnt_support_cash_address_format":
    "不支持法币地址",
  "account.withdraw.non_integer_limit":
    "可转出代币数量不正确",
  "account.withdraw.invalid_limit": "无效的限额",
  "account.withdraw.non_positive_page": "代币转出错误",
  "account.withdraw.non_integer_otp":
    "Otp value could not be parsed into Integer type",
  "account.withdraw.empty_otp": "OTP为空",
  "account.withdraw.empty_rid": "rid为空",
  "account.withdraw.non_decimal_amount":
    "转出数额错误",
  "account.withdraw.non_positive_amount": "转出数额错误",
  "account.deposit.not_permitted":
    "未满足充值权限",
  "account.withdraw.not_permitted":
    "未满足转出权限",
  "account.withdraw.insufficient_balance": "账户余额不足",
  "account.withdraw.invalid_amount": "无效的转出数量",
  "account.withdraw.create_error": "创建转出请求失败",
  "account.withdraw.invalid_otp": "无效OTP",
  "account.withdraw.disabled_api": "代币转出API禁用",

  "market.market.doesnt_exist": "交易对不存在",
  "market.order.invalid_state": "无效的委托状态",
  "market.order.invalid_limit": "无效的委托限额",
  "market.order.non_integer_limit":
    "限额非整型",
  "market.trade.empty_page": "页面为空",
  "market.order.invalid_order_by": "无效order_by",
  "market.order.invalid_side": "无效的委托方向",
  "market.order.non_decimal_volume":
    "交易量非Decimal类型",
  "market.order.non_positive_volume": "交易量非正数",
  "market.order.invalid_type": "无效的委托类型",
  "market.order.non_decimal_price":
    "价格非Decimal类型",
  "market.order.non_positive_price": "价格非正数",
  "market.order.non_integer_id":
    "Id非整型",
  "market.order.empty_id": "Id为空",
  "market.trade.non_integer_limit":
    "Limit value you send could not be parsed into Integer type",
  "market.trade.invalid_limit": "无效的限额",
  "market.trade.non_integer_timestamp":
    "Timestamp value you send could not be parsed into Integer type",
  "market.trade.empty_timestamp": "时间戳缺失",
  "market.trade.invalid_order_by": "不正确的委托方",
  "market.order.insufficient_market_liquidity": "市场流动性不足",
  "market.order.invalid_volume_or_price": "请提供正确的交易量或价格",
  "market.order.create_error": "创建委托失败",
  "market.order.cancel_error": "取消委托失败",
  "market.order.market_order_price": "委托缺少价格",
  "market.trade.not_permitted":
    "缺少交易权限",
  "market.account.insufficient_balance": "账户余额不足",

  "public.currency.doesnt_exist": "代币不存在",
  "public.currency.invalid_type": "无效的代币类型",
  "public.market.doesnt_exist": "交易不存在",
  "public.order_book.non_integer_ask_limit":
    "不正确的卖出限额",
  "public.order_book.invalid_ask_limit": "不正确的卖出限额",
  "public.order_book.non_integer_bid_limit":
    "不正确的买入限额",
  "public.order_book.invalid_bid_limit": "不正确的买入限额",
  "public.trade.non_integer_limit":
    "不正确的交易限额",
  "public.trade.invalid_limit": "不正确的交易限额",
  "public.trade.non_positive_page": "Page value must be positive",
  "public.trade.non_integer_timestamp":
    "Timestamp value you send could not be parsed into Integer type",
  "public.trade.invalid_order_by": "不正确的委托方",
  "public.market_depth.non_integer_limit":
    "Limit value you send could not be parsed into Integer type",
  "public.market_depth.invalid_limit": "Invalid limit",
  "public.k_line.non_integer_period":
    "Limit value you send could not be parsed into Integer type",
  "public.k_line.invalid_period": "Invalid period",
  "public.k_line.non_integer_time_from":
    "Limit value you send could not be parsed into Integer type",
  "public.k_line.empty_time_from": "Time_from param is missing or empty",
  "public.k_line.non_integer_time_to":
    "Limit value you send could not be parsed into Integer type",
  "public.k_line.empty_time_to": "Time_to param is missing or empty",
  "public.k_line.non_integer_limit":
    "Limit value you send could not be parsed into Integer type",
  "public.k_line.invalid_limit": "Invalid limit",

  "server.internal_error": "内部错误",
  "LOG_OUT": "退出成功"
};
