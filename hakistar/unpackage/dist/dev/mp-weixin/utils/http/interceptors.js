"use strict";
const common_vendor = require("../../common/vendor.js");
const getToken = () => common_vendor.index.getStorageSync("token") || "";
const requestInterceptor = (config) => {
  const token = getToken();
  if (token) {
    config.header = {
      ...config.header,
      Authorization: `Bearer ${token}`
    };
  }
  return config;
};
const transformResponse = (res) => {
  if (res.statusCode !== 200) {
    common_vendor.index.showToast({
      title: res.data.message,
      icon: "none"
    });
    return;
  }
  if (!res.data.success) {
    common_vendor.index.showToast({
      title: res.data.message,
      icon: "none"
    });
  }
  return res.data.data;
};
exports.requestInterceptor = requestInterceptor;
exports.transformResponse = transformResponse;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/utils/http/interceptors.js.map
