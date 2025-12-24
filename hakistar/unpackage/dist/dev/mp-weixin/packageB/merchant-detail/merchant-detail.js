"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_up_rate2 = common_vendor.resolveComponent("up-rate");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_up_rate2 + _easycom_up_button2 + _easycom_up_icon2)();
}
const _easycom_up_rate = () => "../../uni_modules/uview-plus/components/u-rate/u-rate.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_rate + _easycom_up_button + _easycom_up_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "merchant-detail",
  setup(__props) {
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at packageB/merchant-detail/merchant-detail.vue:107", "opt", JSON.parse(options.info));
      merchant_info.value = JSON.parse(options.info);
      getService();
    });
    const merchant_info = common_vendor.ref({});
    const serviceList = common_vendor.ref([]);
    const getService = async () => {
      const data = await utils_http_index.get("/home/service", { merchant_id: merchant_info.value.merchant_id });
      serviceList.value = data;
    };
    const call = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: merchant_info.value.phone
      });
    };
    const viewLocation = () => {
      common_vendor.index.openLocation({
        latitude: 39.9042,
        //维度
        longitude: 116.4074,
        //经度
        name: merchant_info.value.merchant_name,
        address: merchant_info.value.address,
        success(res) {
          common_vendor.index.__f__("log", "at packageB/merchant-detail/merchant-detail.vue:130", "打开地图成功", res);
        },
        fail(err) {
          common_vendor.index.__f__("log", "at packageB/merchant-detail/merchant-detail.vue:133", "打开地图失败", err);
        }
      });
    };
    const bookNow = (item) => {
      let selPro = [{
        count: 1,
        main_pic: "http://localhost:3000/img/part/宠物寄养.png",
        name: item.service_name,
        price: item.service_price,
        product_id: item.merchant_id,
        spec: ""
      }];
      common_vendor.index.navigateTo({
        url: "/packageB/order/order?selPro=" + JSON.stringify(selPro)
      });
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: merchant_info.value.pic,
        c: common_vendor.t(merchant_info.value.merchant_name),
        d: common_vendor.o(($event) => merchant_info.value.rating = $event),
        e: common_vendor.p({
          readonly: true,
          ["allow-half"]: true,
          ["active-color"]: "#ffce2c",
          ["inactive-color"]: "#b2b2b2",
          modelValue: merchant_info.value.rating
        }),
        f: common_vendor.t(merchant_info.value.rating),
        g: merchant_info.value.rating > 4.5
      }, merchant_info.value.rating > 4.5 ? {} : {}, {
        h: common_vendor.t(merchant_info.value.address),
        i: common_vendor.f((_a = merchant_info.value.tag) == null ? void 0 : _a.split(","), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        j: common_vendor.f(serviceList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.service_name),
            b: common_vendor.t(item.service_price),
            c: common_vendor.t(item.service_unit),
            d: common_vendor.o(($event) => bookNow(item), item.id),
            e: "29046045-1-" + i0,
            f: item.id
          };
        }),
        k: common_assets._imports_1$2,
        l: common_vendor.p({
          type: "primary",
          size: "mini"
        }),
        m: common_vendor.p({
          name: "map",
          size: "32rpx",
          color: "#666"
        }),
        n: common_vendor.t(merchant_info.value.address),
        o: common_vendor.p({
          name: "clock",
          size: "32rpx",
          color: "#666"
        }),
        p: common_vendor.t(merchant_info.value.business_hours),
        q: common_vendor.p({
          name: "phone",
          size: "32rpx",
          color: "#666"
        }),
        r: common_vendor.t(merchant_info.value.phone),
        s: common_vendor.o(call),
        t: common_vendor.p({
          type: "primary"
        }),
        v: common_vendor.o(viewLocation),
        w: common_vendor.p({
          type: "info"
        }),
        x: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29046045"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageB/merchant-detail/merchant-detail.js.map
