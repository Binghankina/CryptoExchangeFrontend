module.exports = {
  root: true,
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    node: true,
    jquery: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "plugin:vue/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  "globals": {
    config: true,
    TradingView: true,
    ApiClient: true
  }
};
