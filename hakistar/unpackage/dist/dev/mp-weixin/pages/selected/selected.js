"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_uni_search_bar2 + _easycom_up_icon2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_up_icon + ProductSpecPopup)();
}
const ProductSpecPopup = () => "../../components/products-spec-popup/product-spec-popup.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "selected",
  setup(__props) {
    common_vendor.onLoad(() => {
      getCategories();
    });
    common_vendor.onShow(() => {
      getCartCount();
    });
    const currentPage = common_vendor.ref(1);
    const categories = common_vendor.ref([]);
    const getCategories = async () => {
      try {
        const data = await utils_http_index.get("/sel/tag");
        categories.value = data.tag;
        getProducts(currentPage.value, categories.value[0].id);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/selected/selected.vue:88", "获取失败");
      }
    };
    const products = common_vendor.ref([]);
    const totalPages = common_vendor.ref(0);
    const getProducts = async (page, category_id) => {
      try {
        const data = await utils_http_index.get("/sel/products", { page, category_id });
        if (page == 1) {
          products.value = data.list;
        } else {
          products.value = [...products.value, ...data.list];
        }
        totalPages.value = data.pagination.totalPages;
        currentPage.value = page;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/selected/selected.vue:105", error);
      }
    };
    const currentCategory = common_vendor.ref(0);
    const swtichCategory = (index, category_id) => {
      currentCategory.value = index;
      currentPage.value = 1;
      products.value = [];
      getProducts(currentPage.value, category_id);
    };
    common_vendor.onReachBottom(() => {
      common_vendor.index.__f__("log", "at pages/selected/selected.vue:119", "触底了");
      if (currentPage.value < totalPages.value) {
        getProducts(currentPage.value + 1, categories.value[currentCategory.value].id);
      }
    });
    const cartCount = common_vendor.ref(0);
    const getCartCount = async () => {
      try {
        const data = await utils_http_index.get("/cart/list");
        cartCount.value = data.length;
      } catch (error) {
      }
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
    const show = common_vendor.ref(false);
    const selProduct = common_vendor.ref({});
    const addCart = (product) => {
      show.value = true;
      selProduct.value = product;
    };
    const handleClose = () => {
      show.value = false;
      getCartCount();
    };
    const goProductDetail = (product) => {
      common_vendor.index.navigateTo({
        url: `/packageA/product-detail/product-detail?product=${JSON.stringify(product)}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          radius: "100",
          placeholder: "猫粮狗粮、宠物零食",
          clearButton: "none",
          cancelButton: "none"
        }),
        b: common_vendor.f(categories.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.category_name),
            b: item.id,
            c: currentCategory.value === index ? 1 : "",
            d: common_vendor.o(($event) => swtichCategory(index, item.id), item.id)
          };
        }),
        c: common_vendor.t(categories.value.length > 0 ? categories.value[currentCategory.value].category_name : "暂无数据"),
        d: common_vendor.f(products.value, (item, k0, i0) => {
          return {
            a: item.main_pic,
            b: common_vendor.o(($event) => goProductDetail(item), item.id),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.price),
            e: "6737212f-1-" + i0,
            f: common_vendor.o(($event) => addCart(item), item.id),
            g: item.id
          };
        }),
        e: common_vendor.p({
          name: "shopping-cart",
          color: "#fff",
          size: "18"
        }),
        f: common_vendor.p({
          name: "shopping-cart",
          color: "#ffce2c",
          size: "80rpx"
        }),
        g: cartCount.value > 0
      }, cartCount.value > 0 ? {
        h: common_vendor.t(cartCount.value)
      } : {}, {
        i: common_vendor.o(goCart),
        j: common_vendor.o(handleClose),
        k: common_vendor.p({
          show: show.value,
          product: selProduct.value,
          showOk: false
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6737212f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/selected/selected.js.map
