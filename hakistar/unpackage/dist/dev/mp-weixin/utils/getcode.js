"use strict";
const common_vendor = require("../common/vendor.js");
const reverseCode = (longitude, latitude) => {
  return new Promise((resolve, reject) => {
    if (typeof longitude !== "number" || typeof latitude !== "number") {
      reject("经纬度必须为数字");
      return;
    }
    common_vendor.index.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: "5bae6b196907f97857fdc699d03e23a9",
        location: `${longitude},${latitude}`
      },
      success(res) {
        common_vendor.index.__f__("log", "at utils/getcode.ts:28", "高德api接口返回", res);
        const data = res.data;
        if (data.status !== "1") {
          reject("高德api错误");
          return;
        }
        const address = data.regeocode.addressComponent.city.length ? data.regeocode.addressComponent.city : data.regeocode.addressComponent.province;
        resolve(address);
      },
      fail(err) {
        reject(`请求失败:${err.errMsg}`);
      }
    });
  });
};
exports.reverseCode = reverseCode;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/getcode.js.map
