"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_up_search2 = common_vendor.resolveComponent("up-search");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_rate2 = common_vendor.resolveComponent("up-rate");
  const _easycom_up_divider2 = common_vendor.resolveComponent("up-divider");
  const _easycom_up_picker2 = common_vendor.resolveComponent("up-picker");
  (_easycom_up_search2 + _easycom_up_icon2 + _easycom_up_tabs2 + _easycom_up_rate2 + _easycom_up_divider2 + _easycom_up_picker2)();
}
const _easycom_up_search = () => "../../uni_modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_tabs = () => "../../uni_modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_rate = () => "../../uni_modules/uview-plus/components/u-rate/u-rate.js";
const _easycom_up_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_up_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (_easycom_up_search + _easycom_up_icon + _easycom_up_tabs + _easycom_up_rate + _easycom_up_divider + _easycom_up_picker)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "merchant",
  setup(__props) {
    const list1 = common_vendor.reactive([
      { name: "推荐" },
      { name: "寄养" },
      { name: "摄影" },
      { name: "美容" },
      { name: "洗澡" },
      { name: "接送" },
      { name: "疫苗" },
      { name: "训练" }
    ]);
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at packageB/merchant/merchant.vue:79", 111, options.keyword);
      const index = list1.findIndex((item) => options.keyword.includes(item.name));
      common_vendor.index.__f__("log", "at packageB/merchant/merchant.vue:81", 555, index);
      currentIndex.value = index === -1 ? 0 : index;
      params.keyword = index === -1 ? "" : list1[index].name;
      getMerchanList(1);
    });
    const currentIndex = common_vendor.ref(0);
    const params = common_vendor.reactive({
      keyword: "",
      merchantName: "",
      sortBy: ""
    });
    const handleSelect = (item, index) => {
      searchWord.value = "";
      params.merchantName = "";
      if (index === 0) {
        params.keyword = "";
      } else {
        params.keyword = item.name;
      }
      getMerchanList(1);
    };
    const merchanList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const totalPages = common_vendor.ref(0);
    const getMerchanList = async (page) => {
      try {
        const data = await utils_http_index.get("/home/merchants", { page, ...params });
        if (page === 1) {
          merchanList.value = data.list;
        } else {
          merchanList.value = [...merchanList.value, ...data.list];
        }
        totalPages.value = data.pagination.totalPages;
        currentPage.value = data.pagination.current;
      } catch (error) {
        common_vendor.index.__f__("error", "at packageB/merchant/merchant.vue:122", "获取失败");
      }
    };
    common_vendor.onReachBottom(() => {
      if (currentPage.value < totalPages.value) {
        getMerchanList(currentPage.value + 1);
      }
    });
    const show = common_vendor.ref(false);
    const uPickerRef = common_vendor.ref(null);
    const columns = common_vendor.reactive([
      ["默认", "由低到高", "由高到低"]
    ]);
    const changeSort = (index) => {
      show.value = true;
      uPickerRef.value.setIndexs([0]);
    };
    const close = () => {
      show.value = false;
    };
    const confirm = (e) => {
      if (e.value[0] === "默认") {
        params.sortBy = "";
      } else if (e.value[0] === "由高到低") {
        params.sortBy = "rating";
      } else if (e.value[0] === "由低到高") {
        params.sortBy = "rating_asc";
      }
      getMerchanList(1);
      close();
    };
    const searchWord = common_vendor.ref("");
    const handleSearch = () => {
      params.merchantName = searchWord.value;
      params.keyword = "";
      currentIndex.value = 0;
      getMerchanList(1);
    };
    const goDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/packageB/merchant-detail/merchant-detail?info=${JSON.stringify(item)}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(($event) => searchWord.value = $event),
        c: common_vendor.p({
          placeholder: "搜索商家",
          clearabled: false,
          modelValue: searchWord.value
        }),
        d: common_vendor.p({
          name: "arrow-down",
          size: "16",
          color: "#999"
        }),
        e: common_vendor.o(($event) => changeSort()),
        f: common_vendor.p({
          name: "arrow-down",
          size: "16",
          color: "#999"
        }),
        g: common_vendor.o(($event) => changeSort()),
        h: common_vendor.p({
          name: "arrow-down",
          size: "16",
          color: "#999"
        }),
        i: common_vendor.o(($event) => changeSort()),
        j: common_vendor.o(handleSelect),
        k: common_vendor.o(($event) => currentIndex.value = $event),
        l: common_vendor.p({
          list: list1,
          current: currentIndex.value
        }),
        m: common_vendor.f(merchanList.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.merchant_name),
            c: "c169926f-5-" + i0,
            d: common_vendor.o(($event) => item.rating = $event, item.merchant_id),
            e: common_vendor.p({
              readonly: true,
              ["inactive-color"]: "#b2b2b2",
              ["active-color"]: "#ffce2c",
              modelValue: item.rating
            }),
            f: common_vendor.t(item.rating),
            g: common_vendor.t(item.address),
            h: common_vendor.f(item.service.split(","), (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            i: item.merchant_id,
            j: common_vendor.o(($event) => goDetail(item), item.merchant_id)
          };
        }),
        n: common_vendor.p({
          text: "我是有底线的"
        }),
        o: common_vendor.sr(uPickerRef, "c169926f-7", {
          "k": "uPickerRef"
        }),
        p: common_vendor.o(close),
        q: common_vendor.o(confirm),
        r: common_vendor.p({
          show: show.value,
          columns
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c169926f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageB/merchant/merchant.js.map
