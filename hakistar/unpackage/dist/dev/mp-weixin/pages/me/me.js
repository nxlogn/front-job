"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "me",
  setup(__props) {
    let userInfo = common_vendor.ref(null);
    common_vendor.onShow(() => {
      userInfo.value = common_vendor.index.getStorageSync("user");
      common_vendor.index.__f__("log", "at pages/me/me.vue:93", "用户数据", userInfo.value);
    });
    const nickName = common_vendor.computed(() => {
      return userInfo.value && userInfo.value.username ? userInfo.value.username : "铲屎官一枚" + userInfo.value.user_id;
    });
    const avatar = common_vendor.computed(() => {
      return userInfo.value && userInfo.value.avatar ? userInfo.value.avatar : "/static/modules/home/dog1.png";
    });
    const handleLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登陆吗?",
        success(res) {
          if (res.confirm) {
            common_vendor.index.clearStorageSync();
            userInfo.value = null;
            common_vendor.index.showToast({
              title: "退出成功",
              icon: "success"
            });
          }
        }
      });
    };
    const goAddress = () => {
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/packageB/address/address"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: avatar.value,
        b: common_vendor.t(common_vendor.unref(userInfo) ? nickName.value : "用户暂未登录"),
        c: !common_vendor.unref(userInfo)
      }, !common_vendor.unref(userInfo) ? {
        d: common_vendor.o(handleLogin)
      } : {}, {
        e: common_assets._imports_0$3,
        f: common_assets._imports_1$1,
        g: common_assets._imports_2$2,
        h: common_assets._imports_3$1,
        i: common_assets._imports_4$1,
        j: common_assets._imports_5,
        k: common_assets._imports_6,
        l: common_assets._imports_7,
        m: common_vendor.p({
          title: "设置",
          showArrow: true
        }),
        n: common_vendor.p({
          title: "帮助中心",
          showArrow: true
        }),
        o: common_vendor.p({
          title: "关于我们",
          showArrow: true
        }),
        p: common_vendor.p({
          title: "地址管理",
          showArrow: true
        }),
        q: common_vendor.o(goAddress),
        r: common_vendor.p({
          title: "联系我们",
          showArrow: true
        }),
        s: common_vendor.p({
          title: "退出",
          showArrow: true
        }),
        t: common_vendor.o(handleLogout),
        v: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19c123a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/me/me.js.map
