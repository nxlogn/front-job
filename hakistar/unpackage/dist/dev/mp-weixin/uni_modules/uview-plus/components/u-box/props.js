"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js");
require("../../libs/config/props.js");
const propsBox = uni_modules_uviewPlus_libs_vue.defineMixin({
  props: {
    // 背景色
    bgColors: {
      type: [Array],
      default: ["#EEFCFF", "#FCF8FF", "#FDF8F2"]
    },
    // 高度
    height: {
      type: [String],
      default: "160px"
    },
    // 圆角
    borderRadius: {
      type: [String],
      default: "6px"
    },
    // 间隔
    gap: {
      type: [String],
      default: "15px"
    }
  }
});
exports.propsBox = propsBox;
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uview-plus/components/u-box/props.js.map
