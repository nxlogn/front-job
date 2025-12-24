"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_http_index = require("../../utils/http/index.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  const _easycom_up_picker2 = common_vendor.resolveComponent("up-picker");
  (_easycom_up_icon2 + _easycom_up_popup2 + _easycom_up_picker2)();
}
const _easycom_up_icon = () => "../../uni_modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_popup = () => "../../uni_modules/uview-plus/components/u-popup/u-popup.js";
const _easycom_up_picker = () => "../../uni_modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (_easycom_up_icon + _easycom_up_popup + _easycom_up_picker)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "address",
  setup(__props) {
    common_vendor.onLoad((options) => {
      getAddressList();
      flag.value = options.flag;
    });
    const addressList = common_vendor.ref([]);
    const getAddressList = async () => {
      try {
        const result = await utils_http_index.get("/cart/address");
        addressList.value = result;
      } catch (error) {
        common_vendor.index.__f__("log", "at packageB/address/address.vue:107", error);
      }
    };
    const deleteAddress = (id) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认要删除这个地址吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              await utils_http_index.post("/cart/deleteAddress", { id });
              common_vendor.index.showToast({
                title: "删除成功",
                icon: "success"
              });
              getAddressList();
            } catch (error) {
              common_vendor.index.__f__("log", "at packageB/address/address.vue:124", error);
            }
          }
        }
      });
    };
    const show = common_vendor.ref(false);
    const columns = common_vendor.reactive([
      ["山东省", "北京市", "广东省", "江苏省"],
      ["青岛市", "济南市", "威海市", "烟台市"],
      ["市南区", "市北区", "崂山区", "李沧区"]
    ]);
    const columnData = common_vendor.reactive([
      ["青岛市", "济南市", "威海市", "烟台市"],
      ["北京市"],
      ["广州市", "深圳市", "珠海市"],
      ["南京市", "苏州市", "无锡市"]
    ]);
    const districtData = common_vendor.reactive([
      //山东省	
      ["市南区", "市北区", "崂山区", "李沧区"],
      // 青岛市
      ["历下区", "市中区", "槐荫区", "天桥区"],
      // 济南市
      ["环翠区", "文登区", "荣成市", "乳山市"],
      // 威海市
      ["芝罘区", "福山区", "牟平区", "莱山区"],
      // 烟台市
      //北京市
      ["东城区", "西城区", "朝阳区", "海淀区", "丰台区"],
      // 广东省城市对应的区
      ["越秀区", "海珠区", "荔湾区", "天河区"],
      // 广州市
      ["福田区", "罗湖区", "南山区", "盐田区"],
      // 深圳市
      ["香洲区", "斗门区", "金湾区"],
      // 珠海市
      // 江苏省城市对应的区
      ["玄武区", "秦淮区", "建邺区", "鼓楼区"],
      // 南京市
      ["姑苏区", "虎丘区", "吴中区", "相城区"],
      // 苏州市
      ["梁溪区", "锡山区", "惠山区", "滨湖区"]
      // 无锡市
    ]);
    const uPickerRef = common_vendor.ref(null);
    const changeHandler = (e) => {
      const {
        columnIndex,
        //操作的那一列的序号 第一列是0
        value,
        //每一列所选的数据，结果是个数组
        values,
        //所有列数据
        index
        //当前所操作列所选中数据的角标
      } = e;
      if (columnIndex === 0) {
        uPickerRef.value.setColumnValues(1, columnData[index]);
        const cityIndex = getCityIndex(index, 0);
        uPickerRef.value.setColumnValues(2, districtData[cityIndex]);
      } else if (columnIndex === 1) {
        const provinceIndex = columns[0].indexOf(value[0]);
        const cityIndex = getCityIndex(provinceIndex, index);
        uPickerRef.value.setColumnValues(2, districtData[cityIndex]);
      }
    };
    const getCityIndex = (provinceIndex, cityIndex) => {
      const cityCountPerProvince = columnData.map((item) => item.length);
      let total = 0;
      for (let i = 0; i < provinceIndex; i++) {
        total += cityCountPerProvince[i];
      }
      return total + cityIndex;
    };
    const confirm = (e) => {
      common_vendor.index.__f__("log", "at packageB/address/address.vue:193", "confirm", e.value);
      show.value = false;
      addressForm.region = e.value;
    };
    const cancel = () => {
      show.value = false;
      addressForm.region = [];
    };
    const showPopup = common_vendor.ref(false);
    const isEdit = common_vendor.ref(false);
    const showAddressPopup = () => {
      isEdit.value = false;
      showPopup.value = true;
    };
    const closePopup = () => {
      showPopup.value = false;
      resetForm();
    };
    const addressForm = common_vendor.reactive({
      name: "",
      phone: "",
      region: [],
      detail: "",
      is_default: 0
    });
    const currentId = common_vendor.ref(null);
    const onDefaultChange = (e) => {
      addressForm.is_default = e.detail.value ? 1 : 0;
    };
    const editAddress = (item) => {
      isEdit.value = true;
      currentId.value = item.id;
      addressForm.name = item.name;
      addressForm.phone = item.phone;
      addressForm.region = [item.province, item.city, item.district];
      addressForm.detail = item.detail;
      addressForm.is_default = item.is_default;
      showPopup.value = true;
    };
    const resetForm = () => {
      addressForm.name = "";
      addressForm.phone = "";
      addressForm.region = [];
      addressForm.detail = "";
      addressForm.is_default = 0;
    };
    const showRegionPicker = () => {
      show.value = true;
    };
    const saveAddress = async () => {
      if (!addressForm.name.trim() || !addressForm.phone.trim() || !addressForm.region.length || !addressForm.detail.trim()) {
        common_vendor.index.showToast({
          title: "地址信息不能为空",
          icon: "none"
        });
        return;
      }
      const newAddress = {
        id: isEdit.value ? currentId.value : null,
        name: addressForm.name,
        phone: addressForm.phone,
        province: addressForm.region[0],
        city: addressForm.region[1],
        district: addressForm.region[2],
        detail: addressForm.detail,
        is_default: addressForm.is_default
      };
      try {
        await utils_http_index.post("/cart/addOrUpdate", newAddress);
        common_vendor.index.showToast({
          title: isEdit.value ? "编辑成功" : "新增成功"
        });
      } catch (error) {
        common_vendor.index.__f__("log", "at packageB/address/address.vue:270", error);
      }
      closePopup();
      getAddressList();
    };
    const flag = common_vendor.ref("");
    const selectAddress = (item) => {
      if (flag.value) {
        common_vendor.index.$emit("addressSelected", item);
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: addressList.value.length
      }, addressList.value.length ? {
        b: common_vendor.f(addressList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.phone),
            c: item.is_default
          }, item.is_default ? {} : {}, {
            d: common_vendor.t(item.province),
            e: common_vendor.t(item.city),
            f: common_vendor.t(item.district),
            g: common_vendor.t(item.detail),
            h: "392a643a-0-" + i0,
            i: common_vendor.o(($event) => editAddress(item), item.id),
            j: "392a643a-1-" + i0,
            k: common_vendor.o(($event) => deleteAddress(item.id), item.id),
            l: item.id,
            m: common_vendor.o(($event) => selectAddress(item), item.id)
          });
        }),
        c: common_vendor.p({
          name: "edit-pen",
          size: "20",
          color: "#666"
        }),
        d: common_vendor.p({
          name: "trash",
          size: "20",
          color: "#666"
        })
      } : {
        e: common_vendor.p({
          name: "map",
          size: "60",
          color: "#ccc"
        })
      }, {
        f: common_vendor.p({
          name: "plus",
          size: "20",
          color: "#fff"
        }),
        g: common_vendor.o(showAddressPopup),
        h: common_vendor.t(isEdit.value ? "编辑地址" : "新增地址"),
        i: addressForm.name,
        j: common_vendor.o(($event) => addressForm.name = $event.detail.value),
        k: addressForm.phone,
        l: common_vendor.o(($event) => addressForm.phone = $event.detail.value),
        m: addressForm.region.length
      }, addressForm.region.length ? {
        n: common_vendor.t(addressForm.region.join(" "))
      } : {}, {
        o: common_vendor.p({
          name: "arrow-right",
          size: "16",
          color: "#999"
        }),
        p: common_vendor.o(showRegionPicker),
        q: addressForm.detail,
        r: common_vendor.o(($event) => addressForm.detail = $event.detail.value),
        s: addressForm.is_default,
        t: common_vendor.o(onDefaultChange),
        v: common_vendor.o(closePopup),
        w: common_vendor.o(saveAddress),
        x: common_vendor.o(closePopup),
        y: common_vendor.p({
          show: showPopup.value,
          closeable: true
        }),
        z: common_vendor.sr(uPickerRef, "392a643a-6", {
          "k": "uPickerRef"
        }),
        A: common_vendor.o(confirm),
        B: common_vendor.o(changeHandler),
        C: common_vendor.o(cancel),
        D: common_vendor.p({
          show: show.value,
          columns
        }),
        E: common_vendor.gei(_ctx, "")
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-392a643a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/packageB/address/address.js.map
