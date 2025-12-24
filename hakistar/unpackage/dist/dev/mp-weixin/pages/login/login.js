"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  (_easycom_up_icon2 + _easycom_up_input2 + _easycom_up_button2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_input + _easycom_up_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const platform = common_vendor.ref("");
    common_vendor.onMounted(() => {
      platform.value = "mp-weixin";
    });
    const fn = () => {
      common_vendor.index.setStorageSync("token", "xulaoshi666");
      common_vendor.index.setStorageSync("user", { user_id: 1, phone: 18888888888 });
      common_vendor.index.showToast({
        title: "登陆成功",
        icon: "success",
        duration: 1500
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 500);
    };
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const countDown = common_vendor.ref(60);
    const isCounting = common_vendor.ref(false);
    const sendCode = async () => {
      try {
        const data = await utils_http_index.post("/auth/sendSmsCode", { phone: phone.value });
        common_vendor.index.__f__("log", "at pages/login/login.vue:138", "验证码已发送", data);
      } catch (error) {
        common_vendor.index.__f__("log", "at pages/login/login.vue:140", "验证码发送失败");
      }
    };
    const getCode = () => {
      if (isCounting.value)
        return;
      const phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(phone.value)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return;
      }
      isCounting.value = true;
      countDown.value = 60;
      const timer = setInterval(() => {
        countDown.value--;
        if (countDown.value <= 0) {
          clearInterval(timer);
          isCounting.value = false;
        }
      }, 1e3);
      sendCode();
    };
    const handleLogin = async () => {
      const phoneReg = /^1[3-9]\d{9}$/;
      if (phoneReg.test(phone.value) && code.value) {
        try {
          const data = await utils_http_index.post("/auth/verifySmsCode", { phone: phone.value, code: code.value });
          common_vendor.index.__f__("log", "at pages/login/login.vue:172", "登录结果", data);
          common_vendor.index.setStorageSync("token", data.token);
          common_vendor.index.setStorageSync("user", data.user);
          common_vendor.index.showToast({
            title: "登陆成功",
            icon: "success",
            duration: 1500
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 500);
        } catch (error) {
          common_vendor.index.__f__("log", "at pages/login/login.vue:184", "登录失败");
        }
      } else {
        common_vendor.index.showToast({
          title: "请输入正确的信息",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$4,
        b: platform.value === "mp-weixin"
      }, platform.value === "mp-weixin" ? {
        c: common_vendor.p({
          name: "weixin-fill",
          color: "#fff",
          size: "32"
        }),
        d: common_vendor.o(fn)
      } : {
        e: common_vendor.o(($event) => phone.value = $event),
        f: common_vendor.p({
          placeholder: "请输入手机号",
          prefixIcon: "phone",
          border: "none",
          prefixIconStyle: "font-size: 22px;color: #909399",
          modelValue: phone.value
        }),
        g: common_vendor.o(($event) => code.value = $event),
        h: common_vendor.p({
          placeholder: "请输入验证码",
          type: "number",
          maxlength: "6",
          border: "none",
          prefixIcon: "lock",
          prefixIconStyle: "font-size: 22px;color: #909399",
          modelValue: code.value
        }),
        i: common_vendor.t(isCounting.value ? countDown.value + "s后重新获取" : "获取验证码"),
        j: common_vendor.o(getCode),
        k: common_vendor.o(handleLogin),
        l: common_vendor.p({
          type: "primary",
          ["custom-style"]: {
            backgroundColor: "#ffce2c",
            borderColor: "#ffce2c",
            height: "88rpx",
            fontSize: "32rpx"
          }
        })
      }, {
        m: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
