<!-- 我的信息 -->
<template>
	<div>
		<div class="head">
			<div class="headImg">
				<img :src="vipInfo.headimg || ImgNull" />
			</div>
			<p>{{vipInfo.name}}</p>
		</div>
		<div class="list" style="margin-top: calc(8.64rem / 2);">
			<p>生日</p>
			<div @click="openPicker('picker')" class="list-right">
				<p :class="(birthday=='选择生日')&&(vipInfo.birthdate=='')?'':'coloeAA'" ref="birthday">{{(birthday=='选择生日')&&(vipInfo.birthdate!='')?vipInfo.birthdate:birthday}}</p>
				<div class="selectDiv">
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>
		<div class="list">
			<p>性别</p>
			<div class="select">
				<div class="select-on" @click="sex(1)">
					<div>
						<img src="@/assets/images/icon/select.png" v-if="ifSex==1" />
						<img src="@/assets/images/icon/sele.png" v-else />
					</div>
					<p>男</p>
				</div>
				<div class="select-on" @click="sex(2)">
					<div>
						<img src="@/assets/images/icon/select.png" v-if="ifSex==2" />
						<img src="@/assets/images/icon/sele.png" v-else />
					</div>
					<p>女</p>
				</div>
			</div>
		</div>
		<div class="list">
			<p>地址</p>
			<div @click="PickerShow" class="list-right">
				<p :class="address.length!=0?'coloeAA':''" ref="address" v-if="address.length!=0 || vipInfo.address==''">{{address | pickerValueFilter}}</p>
				<p :class="vipInfo.address!=''?'coloeAA':''" ref="address" v-else-if="vipInfo.address!=''">{{vipInfo.address}}</p>
				<div class="selectDiv">
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>
		<div class="list">
			<p></p>
			<div class="list-right">
				<input placeholder="填写具体详细地址" style="right:30px;" ref="areaInput" :value="vipInfo.area!=''?vipInfo.area:''"/>
			</div>
		</div>
		<div class="list">
			<p>职业</p>
			<div class="list-right">
				<input placeholder="选择/编辑职业" ref="occupationInput" :value="vipInfo.job!=''?vipInfo.job:''"/>
				<div class="selectDiv">
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>
		<div class="list">
			<p>邮箱</p>
			<div class="list-right">
				<input placeholder="填写您的邮箱" ref="email" :value="vipInfo.email!=''?vipInfo.email:''"/>
				<div class="selectDiv">
					<img src="@/assets/images/icon/mineHore.png" />
				</div>
			</div>
		</div>
		<!-- 日期选择器 -->
		<wv-datetime-picker ref="picker" type="date" v-model="dateTime" @confirm="onConfirm" :start-date="new Date('1970/01/01 00:00')"
		 :end-date="new Date()">
		</wv-datetime-picker>
		<!-- 日期选择器 END-->
		<!-- 地址选择 -->
		<wv-picker :visible.sync="addressPickerShow" ref="addressPicker" :columns="addressColumns" :visible-item-count="5"
		 @change="onAddressChange" @confirm="confirmAddress" />
		<!-- 地址选择 END-->
		<div class="buttonA" @click="submit">
			<button>保存</button>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import chinaAreaData from 'china-area-data';
import { Picker, DatetimePicker, Toast } from 'we-vue';
import * as session from '@/assets/js/session';
Vue.use(DatetimePicker).use(Picker);

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
	name: 'mineInfo',
	data() {
		return {
			dateTime: new Date(),
			birthday: '选择生日',
			addressPickerShow: false,
			address: '', //地址
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
			vipInfo: '',
			ifSex: 1, //性别
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getVipDetail({
			data: {
				openid: this.$store.state.uid
			}
		}).then(res => {
			res.data.vip.birthdate = res.data.vip.birthdate.split(' ')[0];
			if (res.data.vip.gender == '男') {
				this.ifSex = 1;
			} else {
				this.ifSex = 2;
			}
			if (res.data.flag) {
				console.log('个人中心', res.data);
				this.vipInfo = res.data.vip;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	mounted() {
		this.$nextTick(() => {
			this.$refs.addressPicker.setValues(['北京市', '市辖区', '东城区']);
		});
	},
	methods: {
		// 保存用户信息
		submit() {
			var gender = '';
			if (this.ifSex == 1) {
				gender = '男';
			} else {
				gender = '女';
			}
			if (this.$refs.birthday.innerText == '选择生日') {
				Toast.text({
					duration: 1000,
					message: '请选择生日'
				});
				return;
			}
			if (this.$refs.address.innerText == '选择省、区、县') {
				Toast.text({
					duration: 1000,
					message: '请选择省、区、县'
				});
				return;
			}
			if (this.$refs.areaInput.value == '') {
				Toast.text({
					duration: 1000,
					message: '请填写详细地址'
				});
				return;
			}
			if (this.$refs.occupationInput.value == '') {
				Toast.text({
					duration: 1000,
					message: '请填写职业'
				});
				return;
			}
			if (this.$refs.email.value == '') {
				Toast.text({
					duration: 1000,
					message: '请填写邮箱'
				});
				return;
			}
			api.saveVipInfo({
				data: {
					openid: this.$store.state.uid,
					gender: gender,
					birthdate: this.$refs.birthday.innerText,
					address: this.$refs.address.innerText,
					area: this.$refs.areaInput.value,
					job: this.$refs.occupationInput.value,
					email: this.$refs.email.value
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('保存信息', res.data);
					Toast.text({
						duration: 1000,
						message: '保存成功'
					});
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},

		// 选择性别
		sex(res) {
			this.ifSex = res;
		},

		// 选择日期功能
		openPicker(res) {
			this.$refs[res].open();
		},
		onConfirm(res) {
			let year = res.getFullYear();
			let month = res.getMonth() + 1;
			let date = res.getDate();
			this.birthday = `${year}-${month}-${date}`;
		},
		// 选择日期功能 END

		// 选择地区功能
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
				return '选择省、区、县';
			}
		}
	}
};
// };
</script>
<style lang="scss" scoped>
@import '@/assets/css/mineInfo.scss';
</style>
