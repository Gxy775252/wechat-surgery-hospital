<template>
	<div class="all">
		<div class="inputText">
			<p>姓名</p>
			<input placeholder="输入收获人姓名" class="inputText-input"/>
		</div>
		<div class="inputText">
			<p>手机号</p>
			<input  type="number" maxlength="11" placeholder="输入收获人手机号"  class="inputText-input" />
		</div>
		<div class="inputText">
			<p>邮政编码</p>
			<input placeholder="输入邮政编码"  class="inputText-input"/>
		</div>
		<div class="inputText">
			<p>所在区域</p>
			<div :class="address.length==0?'inputText-input':'inputText-input coloeAA'" style="width:68%;" @click="PickerShow">{{address.length==0?selectAddress:address | pickerValueFilter}}</div>
			<div class="imgA">
				<img src="@/assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="inputText">
			<p>详细地址</p>
			<input placeholder="街道、楼牌号等详细地址"  class="inputText-input"/>
		</div>
		<!-- 地址选择 -->
		<wv-picker
		  :visible.sync="addressPickerShow"
		  ref="addressPicker"
		  :columns="addressColumns"
		  :visible-item-count="5"
		  @change="onAddressChange"
		  @confirm="confirmAddress"
		/>
		<!-- 地址选择 END-->	
		<div class="sub">
			<button>保存</button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Picker, Cell, Group } from 'we-vue';
Vue.use(Picker)
	.use(Group)
	.use(Cell);
import chinaAreaData from 'china-area-data';
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
	return typeof chinaAreaData[provinceCode] === 'object'
		? Object.values(chinaAreaData[provinceCode])
		: [];
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
		return typeof chinaAreaData[cityCode] === 'object'
			? Object.values(chinaAreaData[cityCode])
			: [];
	} else {
		// 只有两级的情况
		return [];
	}
}
export default {
	data() {
		return {
			selectAddress: '选择所在城市、省份、区县',
			addressPickerShow: false,
			address: [],
			fruit: [{ name: 'Apple', age: 1 }],
			addressColumns: [
				{
					values: provinces
				},
				{
					values: getCities('北京市')
				},
				{
					values: getAreas('北京市', '市辖区')
				}
			],
			editid:'',//判断是添加还是详情  true=详情
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		// this.$route.params.editid;
		// return;
// 		api.getVipAddressDetail({
// 			data: {
// 				openid: this.globalData.openid,
// 				addressid: 1
// 			}
// 		}).then(res => {
// 			if (res.data.flag) {
// 				console.log('地址列表', res.data);
// 				this.listAddressInfo = res.data.listAddress; //地址列表
// 			} else {
// 				Toast.text({
// 					duration: 1000,
// 					message: res.data.msg
// 				});
// 			}
// 		});
	},
	mounted() {
		this.$nextTick(() => {
			this.$refs.addressPicker.setValues(['北京市', '市辖区', '东城区']);
		});
	},
	methods: {
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
				return '请选择';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/newAddress.scss';
</style>
