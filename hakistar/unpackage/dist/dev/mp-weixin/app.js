"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const uni_modules_uviewPlus_index = require("./uni_modules/uview-plus/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/selected/selected.js";
  "./pages/service/service.js";
  "./pages/me/me.js";
  "./pages/cart/cart.js";
  "./pages/login/login.js";
  "./packageA/product-detail/product-detail.js";
  "./packageB/address/address.js";
  "./packageB/merchant/merchant.js";
  "./packageB/merchant-detail/merchant-detail.js";
  "./packageB/order/order.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
const pinia = common_vendor.createPinia();
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(pinia);
  app.use(uni_modules_uviewPlus_index.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
