"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_getcode = require("../../utils/getcode.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_up_scroll_list2 = common_vendor.resolveComponent("up-scroll-list");
  const _easycom_up_box2 = common_vendor.resolveComponent("up-box");
  const _easycom_up_rate2 = common_vendor.resolveComponent("up-rate");
  const _easycom_up_divider2 = common_vendor.resolveComponent("up-divider");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2 + _easycom_up_scroll_list2 + _easycom_up_box2 + _easycom_up_rate2 + _easycom_up_divider2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_up_scroll_list = () => "../../uni_modules/uview-plus/components/u-scroll-list/u-scroll-list.js";
const _easycom_up_box = () => "../../uni_modules/uview-plus/components/u-box/u-box.js";
const _easycom_up_rate = () => "../../uni_modules/uview-plus/components/u-rate/u-rate.js";
const _easycom_up_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar + _easycom_up_scroll_list + _easycom_up_box + _easycom_up_rate + _easycom_up_divider)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const menuButtonInfo = common_vendor.ref(null);
    common_vendor.onLoad(() => {
      menuButtonInfo.value = common_vendor.index.getMenuButtonBoundingClientRect();
      startLocation();
      getBannerList();
      getPartList();
      getMerchanList(1);
    });
    const headerStyle = common_vendor.computed(() => {
      let style = {
        height: "200px"
      };
      if (menuButtonInfo.value) {
        style = {
          height: `${menuButtonInfo.value.top + menuButtonInfo.value.height + 20}px`
        };
      }
      return style;
    });
    const navStyle = common_vendor.computed(() => {
      let style = {
        top: "0",
        height: "44px"
      };
      if (menuButtonInfo.value) {
        style = {
          top: `${menuButtonInfo.value.top}px`,
          height: `${menuButtonInfo.value.height}px`
        };
      }
      return style;
    });
    const cityName = common_vendor.ref("");
    const startLocation = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:177", "开始定位");
      common_vendor.index.getLocation({
        type: "wgs84",
        geocode: true,
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:182", "获取地理位置成功");
          common_vendor.index.__f__("log", "at pages/index/index.vue:183", "经度是", res.longitude);
          common_vendor.index.__f__("log", "at pages/index/index.vue:184", "纬度是", res.latitude);
          utils_getcode.reverseCode(res.longitude, res.latitude).then((res2) => {
            cityName.value = res2;
          }).catch(() => {
            cityName.value = "无法定位";
          });
        },
        fail() {
          cityName.value = "无法获取位置";
          common_vendor.index.__f__("log", "at pages/index/index.vue:193", "获取地理位置失败");
          common_vendor.index.showModal({
            title: "提示",
            content: "需要获取您的位置信息，是否去设置开启定位权限",
            success(res) {
              if (res.confirm) {
                common_vendor.index.openSetting({
                  success(settings) {
                    common_vendor.index.__f__("log", "at pages/index/index.vue:202", "设置页面", settings);
                  }
                });
              }
            }
          });
        }
      });
    };
    const bannerList = common_vendor.ref([]);
    const getBannerList = async () => {
      try {
        const data = await utils_http_index.get("/home/banner");
        bannerList.value = data.banner;
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:237", err);
      }
    };
    const partList = common_vendor.ref([]);
    const getPartList = async () => {
      try {
        const data = await utils_http_index.get("/home/part");
        partList.value = data.part;
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:249", err);
      }
    };
    const merchanList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const totalPages = common_vendor.ref(0);
    const getMerchanList = async (page) => {
      try {
        const data = await utils_http_index.get("/home/merchants", { page });
        if (page === 1) {
          merchanList.value = data.list;
        } else {
          merchanList.value = [...merchanList.value, ...data.list];
        }
        totalPages.value = data.pagination.totalPages;
        currentPage.value = data.pagination.current;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:268", "获取失败");
      }
    };
    const goMerchant = (title) => {
      common_vendor.index.navigateTo({
        url: "/packageB/merchant/merchant?keyword=" + title
      });
    };
    common_vendor.onReachBottom(() => {
      if (currentPage.value < totalPages.value) {
        getMerchanList(currentPage.value + 1);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "location",
          size: "28",
          color: "#fff"
        }),
        b: common_vendor.t(cityName.value),
        c: common_vendor.o(startLocation),
        d: common_vendor.p({
          radius: "100",
          placeholder: "搜索宠物服务",
          clearButton: "none",
          cancelButton: "none"
        }),
        e: common_vendor.s(navStyle.value),
        f: common_vendor.s(headerStyle.value),
        g: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return {
            a: item.url,
            b: item.title
          };
        }),
        h: common_vendor.f(partList.value, (item, k0, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.title),
            c: item.title,
            d: common_vendor.o(($event) => goMerchant(item.title), item.title)
          };
        }),
        i: common_vendor.p({
          indicatorColor: "#fff0f0",
          indicatorActiveColor: "#ffce2c"
        }),
        j: common_assets._imports_0,
        k: common_assets._imports_1,
        l: common_assets._imports_2,
        m: common_vendor.p({
          height: "180px",
          gap: "12px"
        }),
        n: common_assets._imports_3,
        o: common_assets._imports_4,
        p: common_vendor.f(merchanList.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.merchant_name),
            c: "1cf27b2a-4-" + i0,
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
            i: item.merchant_id
          };
        }),
        q: common_vendor.p({
          text: "我是有底线的"
        }),
        r: common_vendor.gei(_ctx, "")
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
