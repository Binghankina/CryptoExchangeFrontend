export default {
  //Auth Message
  "resource.labels.private": "Can't update label",
  "resource.user.no_activity": "No activity recorded or wrong topic",
  "resource.profile.not_exist": "User has no profile",
  "resource.profile.exist": "Profile already exists",
  "resource.api_key.2fa_disabled": "Only accounts with enabled 2FA allowed",
  "resource.api_key.missing_otp":
    "The account has enabled 2FA but OTP code is missing",
  "resource.api_key.invalid_otp": "OTP code is invalid",
  "resource.phone.twillio": "Something wrong with Twilio Client",
  "resource.phone.invalid_num": "Phone number is invalid",
  "resource.phone.exists": "Phone number already exists",
  "resource.phone.number_exist": "Phone number already exists",
  "resource.phone.verification_invalid":
    "Phone is not found or verification code is invalid",
  "resource.documents.limit_reached":
    "Maximum number of documents already reached",
  "resource.documents.uploaded":
    "Documents uploaded successfully",
  "resource.documents.limit_will_be_reached":
    "Documents amount will reach limit by this upload",
  "resource.otp.already_enabled":
    "2FA has been already enabled for this account",
  "resource.otp.invalid": "OTP code is invalid",
  "resource.password.doesnt_match": "New passwords don't match",
  "resource.password.prev_pass_not_correct": "Previous password is not correct",
  "resource.password.no_change_provided":
    "New password cant be the same, as old one",
  "resource.document.empty_doc_expire": "Expiration Date is invalid",
  "resource.document.empty_first_name": "First name is missing",
  "resource.document.empty_last_name": "Last name is missing",
  "resource.document.empty_doc_number": "ID number is missing",
  "password.requirements": "Password does not meet the minimum requirements",
  "password.password.password_strength": "Password is too weak",

  "email.taken": "Email already have been taken",

  "identity.user.invalid_referral_format": "Invalid referral uid format",
  "identity.user.referral_doesnt_exist": "Referral doesn't exist",
  "identity.user.active_or_doesnt_exist":
    "User doesn't exist or has already been activated",
  "identity.password.user_doesnt_exist": "User doesn't exist",
  "identity.user.passwords_doesnt_match": "Passwords don't match",
  "identity.user.utilized_token": "JWT has already been used",
  "identity.session.invalid_login_params": "Invalid Email or Password",
  "identity.session.invalid": "Invalid Session",
  "identity.captcha.required": "captcha_response is required",
  "identity.captcha.mandatory_fields": "Mandatory fields must be filled in",
  "identity.session.not_active": "Your account is not active",
  "identity.session.banned": "Your account is banned",
  "identity.session.invalid_params": "Invalid Email or Password",
  "identity.session.missing_otp":
    "The account has enabled 2FA but OTP code is missing",
  "identity.session.invalid_otp": "OTP code is invalid",
  "identity.sms.too_many_req": "Request is too frequent",

  "first_name.invalid": "First name is invalid",
  "last_name.invalid": "Last name is invalid",
  "city.invalid": "City is invalid",
  "postcode.invalid": "Postcode is invalid",
  "address.invalid": "Address is invalid",
  "first_name.blank": "First name is missing or empty",
  "last_name.blank": "Last name is missing or empty",
  "dob.blank": "Date of birth is invalid",
  "address.blank": "Address is missing or empty",
  "city.blank": "City is missing or empty",
  "country.blank": "Country is missing or empty",
  "postcode.blank": "Postcode is missing or empty",
  "country.must have alpha2 or alpha3 format":
    "Country must have alpha2 or alpha3 format",

  "totp.error": "OTP code is invalid",

  "record.not_found": "Record is not found",
  "jwt.decode_and_verify": "Failed to decode and verify JWT",
  "authz.invalid_session": "Failed to decode cookies",
  "authz.user_not_active": "User is not active",
  "authz.invalid_signature": "API Key header 'signature' is invalid",
  "authz.apikey_not_active": "API Key state is 'inactive",
  "authz.disabled_2fa": "API Key owner has disabled 2FA",
  "authz.invalid_api_key_headers": "Blank or missing API Key headers",
  "authz.permission_denied": "Path is blacklisted",
  "authz.unexistent_apikey": "X-Auth-Apikey header is invalid",

  // validation errors
  // identity module
  "identity.user.missing_email": "Email is missing",
  "identity.user.empty_mobile": "Mobile is missing",
  "identity.user.empty_email": "Email is missing or empty",
  "identity.user.missing_password": "Password is missing",
  "identity.user.empty_password": "Password is missing or empty",
  "identity.user.missing_token": "Token is missing",
  "identity.user.empty_token": "Token is missing or empty",
  "identity.user.missing_reset_password_token":
    "Reset password token is missing",
  "identity.user.empty_reset_password_token":
    "Reset password token is missing or empty",
  "identity.user.missing_confirm_password": "Confirm password is missing",
  "identity.user.empty_confirm_password":
    "Confirm password is missing or empty",

  "identity.session.missing_emai": "Email is missing",
  "identity.session.missing_password": "Password is missing",
  "identity.session.invalid_captcha_format": "Invalid captcha format",

  // resource module
  "resource.otp.missing_code": "OTP code is missing",
  "resource.otp.empty_code": "OTP code is missing or empty",

  "resource.labels.missing_key": "Key is missing",
  "resource.labels.empty_key": "Key is missing or empty",
  "resource.labels.missing_value": "Value is missing",
  "resource.labels.empty_value": "Value is missing or empty",

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

  "resource.profile.missing_first_name": "First name is missing",
  "resource.profile.missing_last_name": "Last name is missing",
  "resource.profile.missing_dob": "Date of birth is missing",
  "resource.profile.missing_address": "Address is missing",
  "resource.profile.missing_postcode": "Postcode is missing",
  "resource.profile.missing_city": "City is missing",
  "resource.profile.missing_country": "Country is missing",

  "resource.api_key.missing_algorithm": "Algorithm is missing",
  "resource.api_key.empty_algorithm": "Algorithm is missing or empty",
  "resource.api_key.empty_kid": "KID is missing or empty",
  "resource.api_key.empty_scope": "Scope is missing or empty",
  "resource.api_key.missing_totp": "TOTP code is missing",
  "resource.api_key.empty_totp": "TOTP code is missing or empty",
  "resource.api_key.missing_kid": "KID is missing",
  "resource.api_key.empty_state": "State is missing or empty",

  "resource.phone.missing_phone_number": "Phone number is missing",
  "resource.phone.empty_phone_number": "Phone number is missing or empty",
  "resource.phone.missing_verification_code": "Verification code is missing",
  "resource.phone.empty_verification_code":
    "Verification code is missing or empty",

  // peatio
  "account.currency.doesnt_exist": "Currency doesn't exist",
  "account.deposit.invalid_state": "Deposit invalid state",
  "account.deposit.non_integer_limit":
    "Value you send could not be parsed into Integer type",
  "account.deposit.invalid_limit": "Invalid limit",
  "account.deposit.non_positive_page": "Page value must be positive",
  "account.deposit.empty_txid": "Txid is missing, txid is empty",
  "account.deposit_address.invalid_address_format":
    "Invalid deposit address format",
  "account.deposit_address.doesnt_support_cash_address_format":
    "Currency doesn't support cash address format",
  "account.withdraw.non_integer_limit":
    "Limit Value you send could not be parsed into Integer type",
  "account.withdraw.invalid_limit": "Invalid limit",
  "account.withdraw.non_positive_page": "Page value must be positive",
  "account.withdraw.non_integer_otp":
    "Otp value could not be parsed into Integer type",
  "account.withdraw.empty_otp": "OTP is missing, otp is empty",
  "account.withdraw.empty_rid": "Address is missing, rid is empty",
  "account.withdraw.non_decimal_amount":
    "Amount value you send could not be parsed into Decimal type",
  "account.withdraw.non_positive_amount": "Amount value must be positive",
  "account.deposit.not_permitted":
    "Deposits are allowed after phone verification",
  "account.withdraw.not_permitted":
    "Please, pass the corresponding verification steps to withdraw funds",
  "account.withdraw.insufficient_balance": "Account balance is insufficient",
  "account.withdraw.invalid_amount": "Invalid withdraw amount",
  "account.withdraw.create_error": "Failed to create withdraw",
  "account.withdraw.invalid_otp": "Invalid OTP",
  "account.withdraw.disabled_api": "Withdrawal API is disabled",

  "market.market.doesnt_exist": "Market doesn't exist",
  "market.order.invalid_state": "Invalid deposit state",
  "market.order.invalid_limit": "Invalid limit",
  "market.order.non_integer_limit":
    "Limit value you send could not be parsed into Integer type",
  "market.trade.empty_page": "Page is missing or empty",
  "market.order.invalid_order_by": "Invalid order_by",
  "market.order.invalid_side": "Invalid order side",
  "market.order.non_decimal_volume":
    "Volume value you send could not be parsed into Decimal type",
  "market.order.non_positive_volume": "Volume value must be positive",
  "market.order.invalid_type": "Invalid order type",
  "market.order.non_decimal_price":
    "Volume value you send could not be parsed into Decimal type",
  "market.order.non_positive_price": "Volume value must be positive",
  "market.order.non_integer_id":
    "Id value  you send could not be parsed into Integer type",
  "market.order.empty_id": "Id is missing or empty",
  "market.trade.non_integer_limit":
    "Limit value you send could not be parsed into Integer type",
  "market.trade.invalid_limit": "Invalid limit",
  "market.trade.non_integer_timestamp":
    "Timestamp value you send could not be parsed into Integer type",
  "market.trade.empty_timestamp": "Timestamp is missing or empty",
  "market.trade.invalid_order_by": "Invalid order_by",
  "market.order.insufficient_market_liquidity": "Insufficient market liquidity",
  "market.order.invalid_volume_or_price": "Invalid volume or price",
  "market.order.create_error": "Failed to create error",
  "market.order.cancel_error": "Failed to cancel error",
  "market.order.market_order_price": "Market order doesn't have price",
  "market.trade.not_permitted":
    "Please, pass the corresponding verification steps to enable trading",
  "market.account.insufficient_balance": "Account balance is insufficient",

  "public.currency.doesnt_exist": "Currency doesn't exist",
  "public.currency.invalid_type": "Invalid currency type",
  "public.market.doesnt_exist": "Market doesn't exist",
  "public.order_book.non_integer_ask_limit":
    "Ask limit value you send could not be parsed into Integer type",
  "public.order_book.invalid_ask_limit": "Invlalid ask limit",
  "public.order_book.non_integer_bid_limit":
    "Bid limir value you send could not be parsed into Integer type",
  "public.order_book.invalid_bid_limit": "Invalid bid limit",
  "public.trade.non_integer_limit":
    "Limit value you send could not be parsed into Integer type",
  "public.trade.invalid_limit": "Invalid limit",
  "public.trade.non_positive_page": "Page value must be positive",
  "public.trade.non_integer_timestamp":
    "Timestamp value you send could not be parsed into Integer type",
  "public.trade.invalid_order_by": "Invalid order by",
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

  "server.internal_error": "Internal Server Error",

  "LOG_OUT": "LOG OUT"
};
