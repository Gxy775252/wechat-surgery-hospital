<!-- 编辑收货地址 -->
<template>
<div class="all" id="allInput">
 <div class="inputText">
    <p>姓名</p>
    <wv-input placeholder="输入收货人姓名" class="inputText-input coloeAA"  v-model="nameInput" />
  </div>
  <div class="inputText">
    <p>手机号</p>
	  <wv-input type="number" placeholder="输入收货人手机号" class="inputText-input coloeAA"  v-model="phoneInput" />
  </div>
  <div class="inputText">
    <p>邮政编码</p>
    <wv-input placeholder="输入邮政编码"  class="inputText-input coloeAA" v-model="zipCodeInput" />
  </div>
  <div class="inputText">
    <p>所在区域</p>
    <div :class="(address.length!=0 || addressInfo.postArea!='')?'inputText-input coloeAA':'inputText-input'" style="width:68%;" @click="PickerShow">
      <p v-if="address.length==0" ref="areaP">{{addressInfo.postArea!=''?addressInfo.postArea:''}}</p>
      <p v-if="address.length!=0" ref="areaP">{{address.length==0?selectAddress:address | pickerValueFilter}}</p>
    </div>
    <div class="imgA">
      <img src="@/assets/images/icon/mineHore.png" />
    </div>
  </div>
 <div class="inputText">
    <p>详细地址</p>
    <wv-input placeholder="街道、楼牌号等详细地址" class="inputText-input coloeAA"  v-model="addressInput" />
  </div>
  <!-- 地址选择 -->
  <wv-picker :visible.sync="addressPickerShow" ref="addressPicker" :columns="addressColumns" :visible-item-count="5" @change="onAddressChange" @confirm="confirmAddress"  v-model="address"/>
  <!-- 地址选择 END-->
  <div class="sub" @click="submit">
    <button>保存</button>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
  Picker,
  Cell,
  Group,
  Toast,
	Input
} from 'we-vue';
Vue.use(Picker)
  .use(Group)
  .use(Cell)
	.use(Input);
import chinaAreaData from 'china-area-data';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
const provinces = Object.values(chinaAreaData[86]);
// 获取某一省下的市
const getCities = province => {
  let provinceCode;
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i;
      break;
    }
  }
  return typeof chinaAreaData[provinceCode] === 'object' ?
    Object.values(chinaAreaData[provinceCode]) : [];
};
// 获取某一市下的区/县
function getAreas(province, city) {
  let provinceCode, cityCode;
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i;
      break;
    }
  }
  for (let i in chinaAreaData[provinceCode]) {
    if (city === chinaAreaData[provinceCode][i]) {
      cityCode = i;
      break;
    }
  }
  if (chinaAreaData[cityCode]) {
    return typeof chinaAreaData[cityCode] === 'object' ?
      Object.values(chinaAreaData[cityCode]) : [];
  } else {
    // 只有两级的情况
    return [];
  }
}
export default {
  name: 'newAddress',

  data() {
    return {
			phoneInput:'',//手机号
			zipCodeInput:'',//邮编
			nameInput:'',//收货人
			addressInput:'',//详细地址
      selectAddress: '选择所在城市、省份、区县',
      addressPickerShow: false,
      address: [],
      addressColumns: [{
          values: provinces
        },
        {
          values: getCities('北京市')
        },
        {
          values: getAreas('北京市', '市辖区')
        }
      ],
      editid: '', //判断是添加还是详情  true=详情
      addressInfo: '' //地址内容
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    console.log(
      '接收的值',
      session.Lstorage.getItem('ifEditid'),
      session.Lstorage.getItem('editid')
    );
    if (
      session.Lstorage.getItem('ifEditid') &&
      session.Lstorage.getItem('ifEditid') != undefined &&
      session.Lstorage.getItem('editid') != null
    ) {
      api.getVipAddressDetail({
        data: {
          openid: this.$store.state.uid,
          addressid: session.Lstorage.getItem('editid')
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('地址列表', res.data);
					this.phoneInput=res.data.address[0].postPhone;
					this.zipCodeInput=res.data.address[0].zipCode;
					this.nameInput=res.data.address[0].postName;
					this.addressInput=res.data.address[0].postAddress;
          this.addressInfo = res.data.address[0]; //地址内容
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.addressPicker.setValues(['北京市', '市辖区', '东城区']);
    });
  },
  methods: {
    // 提交内容
    submit: function(res) {
      let that = this;
      let isPhone = /^1(3|4|5|7|8)\d{9}$/;
      if (this.nameInput == '') {
        Toast.text({
          duration: 1000,
          message: '姓名不可为空'
        });
        return;
      }
			console.log(this.nameInput)
      if (!isPhone.test(this.phoneInput)) {
        Toast.text({
          duration: 1000,
          message: '请输入正确格式的手机号'
        });
        return;
      }
      if (this.addressInput == '') {
        Toast.text({
          duration: 1000,
          message: '所在区域不可为空'
        });
        return;
      }
      if (this.$refs.areaP.innerText == '') {
        Toast.text({
          duration: 1000,
          message: '详细地址不可为空'
        });
        return;
      }
      // 待修改  选择地址后会清空其他input框的内容
      api.saveVipAddress({
        data: {
          id: session.Lstorage.getItem('editid'),
          openid: this.$store.state.uid,
          postName: this.nameInput,
          postPhone: this.phoneInput,
          postAddress: this.addressInput,
          postArea: this.$refs.areaP.innerText,
          zipCode: this.zipCodeInput
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('保存成功', res.data);
          Toast.text({
            duration: 1000,
            message: '保存成功'
          });
          setTimeout(function() {
            that.$router.go(-1);
          }, 1000);
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },

    PickerShow: function() {
      this.addressPickerShow = true;
    },
    onAddressChange(picker, addressValues, slotIndex) {
      if (slotIndex === 0) {
        const cities = getCities(addressValues[0]);
        picker.setColumnValues(1, cities);
        picker.setColumnValues(2, getAreas(addressValues[0], cities[0]));
      } else if (slotIndex === 1) {
        picker.setColumnValues(2, getAreas(addressValues[0], addressValues[1]));
      }
    },
    confirmAddress(picker) {
      this.address = picker.getValues();
    }
  },
  filters: {
    pickerValueFilter(val) {
      if (Array.isArray(val)) {
        return val.toString();
      } else {
        return '选择所在城市、省份、区县';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/newAddress.scss';
</style>
