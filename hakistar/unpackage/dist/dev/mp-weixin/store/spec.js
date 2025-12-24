"use strict";
const common_vendor = require("../common/vendor.js");
const useSpecStore = common_vendor.defineStore("spec", () => {
  const specText = common_vendor.ref("");
  const count = common_vendor.ref(1);
  const total = common_vendor.ref(0);
  function setSpec(spec) {
    specText.value = spec;
  }
  function setCount(num) {
    count.value = num;
  }
  function setTotal(num) {
    total.value = num;
  }
  return { specText, setSpec, count, setCount, total, setTotal };
});
exports.useSpecStore = useSpecStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/spec.js.map
