"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_up_notice_bar2 = common_vendor.resolveComponent("up-notice-bar");
  const _easycom_up_rate2 = common_vendor.resolveComponent("up-rate");
  const _easycom_up_divider2 = common_vendor.resolveComponent("up-divider");
  (_easycom_up_notice_bar2 + _easycom_up_rate2 + _easycom_up_divider2)();
}
const _easycom_up_notice_bar = () => "../../uni_modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_up_rate = () => "../../uni_modules/uview-plus/components/u-rate/u-rate.js";
const _easycom_up_divider = () => "../../uni_modules/uview-plus/components/u-divider/u-divider.js";
if (!Math) {
  (_easycom_up_notice_bar + _easycom_up_rate + _easycom_up_divider)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "service",
  setup(__props) {
    const serviceList = [
      {
        name: "宠物修剪",
        icon: "/static/modules/service/pet1.png",
        bgColor: "#f0f9ff"
      },
      {
        name: "宠物洗澡",
        icon: "/static/modules/service/pet2.png",
        bgColor: "#f0fdf4"
      },
      {
        name: "宠物医疗",
        icon: "/static/modules/service/pet3.png",
        bgColor: "#fef2f2"
      },
      {
        name: "宠物哺乳",
        icon: "/static/modules/service/pet4.png",
        bgColor: "#fdf4ff"
      },
      {
        name: "宠物狗窝",
        icon: "/static/modules/service/pet5.png",
        bgColor: "#fff7ed"
      },
      {
        name: "宠物玩具",
        icon: "/static/modules/service/pet6.png",
        bgColor: "#f0fdfa"
      },
      {
        name: "宠物罐头",
        icon: "/static/modules/service/pet7.png",
        bgColor: "#faf5ff"
      },
      {
        name: "宠物背包",
        icon: "/static/modules/service/pet8.png",
        bgColor: "#fff1f2"
      }
    ];
    const adoptList = common_vendor.ref([]);
    const getAdoptList = async () => {
      try {
        const res = await utils_http_index.get("/adopt/list");
        adoptList.value = res;
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/service/service.vue:126", "获取失败");
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
        common_vendor.index.__f__("error", "at pages/service/service.vue:146", "获取失败");
      }
    };
    common_vendor.onReachBottom(() => {
      if (currentPage.value < totalPages.value) {
        getMerchanList(currentPage.value + 1);
      }
    });
    common_vendor.onLoad(() => {
      getAdoptList();
      getMerchanList(1);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          text: "您有一份宠物大礼包待领取，请及时领取",
          mode: "closable"
        }),
        b: common_vendor.f(serviceList, (item, k0, i0) => {
          return {
            a: item.icon,
            b: item.bgColor,
            c: common_vendor.t(item.name),
            d: item.name
          };
        }),
        c: common_assets._imports_0$1,
        d: common_assets._imports_0$2,
        e: common_assets._imports_2$1,
        f: common_vendor.f(adoptList.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.location),
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.count),
            e: "cb2df937-1-" + i0,
            f: common_vendor.o(($event) => item.rate = $event, item.id),
            g: common_vendor.p({
              readonly: true,
              ["inactive-color"]: "#b2b2b2",
              ["active-color"]: "#ffce2c",
              activeIcon: "heart-fill",
              inactiveIcon: "heart",
              modelValue: item.rate
            }),
            h: item.id
          };
        }),
        g: common_assets._imports_2$1,
        h: common_vendor.f(merchanList.value, (item, k0, i0) => {
          return {
            a: item.pic,
            b: common_vendor.t(item.merchant_name),
            c: "cb2df937-2-" + i0,
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
        i: common_vendor.p({
          text: "我是有底线的"
        }),
        j: common_vendor.gei(_ctx, "")
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb2df937"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/service/service.js.map
