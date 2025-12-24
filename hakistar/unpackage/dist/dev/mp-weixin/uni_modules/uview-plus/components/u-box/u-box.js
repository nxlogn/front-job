"use strict";
const uni_modules_uviewPlus_components_uBox_props = require("./props.js");
const uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js");
const uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js");
const uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "up-box",
  data() {
    return {};
  },
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.mpMixin, uni_modules_uviewPlus_libs_mixin_mixin.mixin, uni_modules_uviewPlus_components_uBox_props.propsBox],
  computed: {},
  emits: [],
  methods: {
    addStyle: uni_modules_uviewPlus_libs_function_index.addStyle
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.borderRadius,
    b: _ctx.bgColors[0],
    c: _ctx.gap,
    d: _ctx.height,
    e: _ctx.borderRadius,
    f: _ctx.bgColors[1],
    g: _ctx.gap,
    h: _ctx.borderRadius,
    i: _ctx.bgColors[2],
    j: common_vendor.s({
      height: _ctx.height
    }),
    k: common_vendor.s($options.addStyle(_ctx.customStyle)),
    l: common_vendor.gei(_ctx, "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5409417d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-box/u-box.js.map
