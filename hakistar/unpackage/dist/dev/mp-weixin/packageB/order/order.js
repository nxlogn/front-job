"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "order",
  setup(__props) {
    common_vendor.onLoad((options) => {
      getAddress();
      selPro.value = JSON.parse(options.selPro);
      common_vendor.index.$on("addressSelected", (selectedAddress) => {
        common_vendor.index.__f__("log", "at packageB/order/order.vue:111", "选中的地址是", selectedAddress);
        address.value = selectedAddress;
      });
    });
    const address = common_vendor.ref({});
    const getAddress = async () => {
      try {
        const result = await utils_http_index.get("/cart/address");
        address.value = result.filter((item) => item.is_default)[0];
      } catch (error) {
        common_vendor.index.__f__("log", "at packageB/order/order.vue:122", error);
      }
    };
    const chooseAddress = () => {
      common_vendor.index.navigateTo({
        url: "/packageB/address/address?flag=1"
      });
    };
    const selPro = common_vendor.ref([]);
    const totalPrice = common_vendor.computed(() => {
      let total = 0;
      selPro.value.forEach((item) => {
        total += Number(item.price);
      });
      return total;
    });
    const submitOrder = async () => {
      try {
        const res = await utils_http_index.post("/payment/createOrder", {
          openId: "ow4MK7uyLhGxphyZJTFdyy5zD-ow",
          productId: "1001",
          productName: "测试商品",
          productPrice: 0.01,
          productNum: 1
        });
        common_vendor.index.__f__("log", "at packageB/order/order.vue:152", "订单结果", res);
        common_vendor.index.requestPayment({
          provider: "wxpay",
          orderInfo: "测试订单",
          nonceStr: res.data.nonceStr,
          timeStamp: res.data.timeStamp,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success(payRes) {
            common_vendor.index.__f__("log", "at packageB/order/order.vue:162", "支付成功", payRes);
          },
          fail(payError) {
            common_vendor.index.showToast({
              title: "支付失败",
              icon: "none"
            });
            common_vendor.index.__f__("log", "at packageB/order/order.vue:171", "支付失败", payError);
          }
        });
      } catch (error) {
        common_vendor.index.__f__("log", "at packageB/order/order.vue:175", error);
      }
      common_vendor.index.__f__("log", "at packageB/order/order.vue:178", "支付操作");
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: (_a = address.value) == null ? void 0 : _a.name
      }, ((_b = address.value) == null ? void 0 : _b.name) ? {
        b: common_vendor.t(address.value.name),
        c: common_vendor.t(address.value.phone),
        d: common_vendor.t(address.value.province),
        e: common_vendor.t(address.value.city),
        f: common_vendor.t(address.value.district),
        g: common_vendor.t(address.value.detail)
      } : {}, {
        h: common_vendor.p({
          name: "arrow-right",
          size: "24",
          color: "#999"
        }),
        i: common_vendor.o(chooseAddress),
        j: common_vendor.f(selPro.value, (item, k0, i0) => {
          return {
            a: item.main_pic,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.spec),
            d: common_vendor.t(item.price),
            e: common_vendor.t(item.count),
            f: item.product_id
          };
        }),
        k: common_vendor.t(totalPrice.value),
        l: common_vendor.t(totalPrice.value),
        m: common_vendor.t(totalPrice.value),
        n: common_vendor.o(submitOrder),
        o: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-913cca57"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageB/order/order.js.map
