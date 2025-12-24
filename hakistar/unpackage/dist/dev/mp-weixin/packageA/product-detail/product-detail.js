"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http_index = require("../../utils/http/index.js");
const store_spec = require("../../store/spec.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_icon + ProductSpecPopup)();
}
const ProductSpecPopup = () => "../../components/products-spec-popup/product-spec-popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "product-detail",
  setup(__props) {
    const specStore = store_spec.useSpecStore();
    common_vendor.onLoad((options) => {
      productInfo.value = JSON.parse(options.product);
      getImages();
      specStore.setSpec("");
      specStore.setCount(1);
    });
    const productInfo = common_vendor.ref({});
    const productImages = common_vendor.ref([]);
    const getImages = async () => {
      try {
        const res = await utils_http_index.get("/sel/detail", { id: productInfo.value.id });
        productImages.value = res;
      } catch (error) {
        common_vendor.index.__f__("error", "at packageA/product-detail/product-detail.vue:96", "失败");
      }
    };
    const show = common_vendor.ref(false);
    const showSpecPopup = () => {
      show.value = true;
    };
    const handleClose = () => {
      show.value = false;
    };
    const selectedSpec = common_vendor.computed(() => {
      return specStore.specText;
    });
    const selCount = common_vendor.computed(() => {
      return specStore.count;
    });
    const selTotal = common_vendor.computed(() => {
      return specStore.total;
    });
    const addCart = async () => {
      if (selectedSpec.value) {
        try {
          const res = await utils_http_index.post("/cart/addCart", {
            product_id: productInfo.value.id,
            name: productInfo.value.name,
            price: productInfo.value.price,
            count: selCount.value,
            spec: selectedSpec.value,
            main_pic: productInfo.value.main_pic
          });
          common_vendor.index.showToast({
            title: "加购成功",
            icon: "success"
          });
          specStore.setSpec("");
          specStore.setCount(1);
          handleClose();
        } catch (error) {
          common_vendor.index.__f__("error", "at packageA/product-detail/product-detail.vue:137", error);
        }
      } else {
        showSpecPopup();
      }
    };
    const buyNow = () => {
      if (selectedSpec.value) {
        let selPro = [{
          count: selCount.value,
          main_pic: productInfo.value.main_pic,
          name: productInfo.value.name,
          price: selTotal.value,
          product_id: productInfo.value.id,
          spec: selectedSpec.value
        }];
        common_vendor.index.navigateTo({
          url: "/packageB/order/order?selPro=" + JSON.stringify(selPro)
        });
      } else {
        showSpecPopup();
      }
    };
    const goHome = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const goCart = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/cart/cart"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(productImages.value, (item, k0, i0) => {
          return {
            a: item.img_url,
            b: item.id
          };
        }),
        b: common_vendor.t(productInfo.value.price),
        c: common_vendor.t(productInfo.value.o_price),
        d: common_vendor.t(productInfo.value.name),
        e: common_vendor.t(productInfo.value.desc),
        f: common_vendor.t(selectedSpec.value || "请选择规格"),
        g: common_vendor.p({
          name: "arrow-right",
          size: "20",
          color: "#999"
        }),
        h: common_vendor.o(showSpecPopup),
        i: common_vendor.f(productImages.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: item.img_url
          };
        }),
        j: common_vendor.p({
          name: "home",
          size: "40",
          color: "#666"
        }),
        k: common_vendor.o(goHome),
        l: common_vendor.p({
          name: "shopping-cart",
          size: "40",
          color: "#666"
        }),
        m: common_vendor.o(goCart),
        n: common_vendor.o(addCart),
        o: common_vendor.o(buyNow),
        p: common_vendor.o(handleClose),
        q: common_vendor.p({
          show: show.value,
          product: productInfo.value,
          showOk: true
        }),
        r: common_vendor.gei(_ctx, "")
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e220c5d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageA/product-detail/product-detail.js.map
