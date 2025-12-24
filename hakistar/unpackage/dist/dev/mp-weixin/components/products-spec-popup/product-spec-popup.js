"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http_index = require("../../utils/http/index.js");
const store_spec = require("../../store/spec.js");
if (!Array) {
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  _easycom_up_popup2();
}
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  _easycom_up_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "product-spec-popup",
  props: {
    show: { type: Boolean },
    product: {},
    showOk: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const specStore = store_spec.useSpecStore();
    const props = __props;
    const emit = __emit;
    common_vendor.watch(() => props.show, (newVal) => {
      if (newVal) {
        getSpec();
      }
    });
    const specList = common_vendor.ref([]);
    const getSpec = async () => {
      try {
        const res = await utils_http_index.get("/cart/getSpec", { id: props.product.id });
        specList.value = res || [];
        if (!res) {
          handleClose();
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          }, 500);
        }
      } catch (error) {
        common_vendor.index.__f__("log", "at components/products-spec-popup/product-spec-popup.vue:90", error);
      }
    };
    const selectedSpecs = common_vendor.reactive({});
    const selectedTexts = common_vendor.reactive({});
    const selectedSpec = common_vendor.ref("");
    const selectSpec = (attr_id, value_id, value) => {
      selectedSpecs[attr_id] = value_id;
      selectedTexts[attr_id] = value;
      selectedSpec.value = Object.values(selectedTexts).join("，");
    };
    const handleClose = () => {
      emit("close");
      Object.keys(selectedSpecs).forEach((key) => delete selectedSpecs[key]);
      Object.keys(selectedTexts).forEach((key) => delete selectedTexts[key]);
      selectedSpec.value = "";
    };
    const quantity = common_vendor.ref(1);
    const increase = () => {
      quantity.value++;
    };
    const decrease = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };
    const finalPrice = common_vendor.computed(() => {
      let price = Number(props.product.price);
      if (specList.value.length) {
        specList.value.forEach((group) => {
          const selected = group.values.find((item) => selectedSpecs[group.attr_id] === item.value_id);
          common_vendor.index.__f__("log", "at components/products-spec-popup/product-spec-popup.vue:125", "选中的数据", selected);
          if (selected == null ? void 0 : selected.multiple) {
            price *= Number(selected.multiple);
          }
        });
      }
      return price * quantity.value;
    });
    const confirmSpec = async () => {
      const allSelected = specList.value.every((group) => selectedSpecs[group.attr_id]);
      if (!allSelected) {
        common_vendor.index.showToast({
          title: "请选择完整规格",
          icon: "error"
        });
        return;
      }
      try {
        const res = await utils_http_index.post("/cart/addCart", {
          product_id: props.product.id,
          name: props.product.name,
          price: finalPrice.value,
          count: quantity.value,
          spec: selectedSpec.value,
          main_pic: props.product.main_pic
        });
        common_vendor.index.showToast({
          title: "加购成功",
          icon: "success"
        });
        specStore.setSpec("");
        specStore.setCount(1);
        handleClose();
      } catch (error) {
        common_vendor.index.__f__("error", "at components/products-spec-popup/product-spec-popup.vue:163", error);
      }
    };
    const handleOk = () => {
      const allSelected = specList.value.every((group) => selectedSpecs[group.attr_id]);
      if (!allSelected) {
        common_vendor.index.showToast({
          title: "请选择完整规格",
          icon: "error"
        });
        return;
      }
      specStore.setSpec(selectedSpec.value);
      specStore.setCount(quantity.value);
      specStore.setTotal(finalPrice.value);
      handleClose();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.product.main_pic,
        b: common_vendor.t(finalPrice.value),
        c: common_vendor.t(selectedSpec.value || "请选择规格"),
        d: common_vendor.f(specList.value, (group, k0, i0) => {
          return {
            a: common_vendor.t(group.attr_name),
            b: common_vendor.f(group.values, (item, index, i1) => {
              return {
                a: common_vendor.t(item.value),
                b: item.value_id,
                c: selectedSpecs[group.attr_id] === item.value_id ? 1 : "",
                d: common_vendor.o(($event) => selectSpec(group.attr_id, item.value_id, item.value), item.value_id)
              };
            }),
            c: group.attr_id
          };
        }),
        e: common_vendor.o(decrease),
        f: common_vendor.t(quantity.value),
        g: common_vendor.o(increase),
        h: _ctx.showOk
      }, _ctx.showOk ? {
        i: common_vendor.o(handleOk)
      } : {}, {
        j: common_vendor.o(confirmSpec),
        k: common_vendor.o(handleClose),
        l: common_vendor.p({
          show: _ctx.show,
          closeable: true
        }),
        m: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-009bb9d4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/products-spec-popup/product-spec-popup.js.map
