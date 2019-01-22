<template>
	<div class="all">
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>门店时间信息</p>
			</div>
		</div>
		<div class="Allselect">
			<div class="Allselect-stores">
				<p>Stores</p>
				<div class="Allselect-list" @click="prickPro()">
					<div class="listCon" :class="listConA1">
						{{stores.name}}
					</div>
					<div class="listImg">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Subjects</p>
				<div class="Allselect-list" @click="prickject()">
					<div class="listCon" :class="listConA2">
						{{subjects.name}}
					</div>
					<div class="listImg">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
				<span></span>
				<div v-show="ifSee">查看项目详情</div>
			</div>
			<div class="Allselect-stores Third">
				<p>Doctors</p>
				<div class="Allselect-list" @click="doctorJECt()">
					<div class="listCon" :class="listConA3">
						{{doctor.name}}
					</div>
					<div class="listImg">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
				<span></span>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>预约时间</p>
			</div>
		</div>
		<div class="Allselect" style="padding: calc(3rem / 2) 0;">
			<div class="Allselect-top">
				<!-- active -->
				<div v-for="(item,key,index) in listDateInfo" :key='key' @click="clickList(item.date)" :class="item.date===date1? 'listA list':'list'">
					<p>星期{{item.dow}}</p>
					<p>{{item.date}}</p>
				</div>
			</div>
			<div class="Allselect-bottom">
				<p v-for="(item,key,index) in listPeriodInfo" :key='key' :class="item.id==perId?'Bottom-P':''" @click="clickPeriod(item.id)">{{item.period}}</p>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>预约信息</p>
			</div>
		</div>
		<div class="Allselect">
			<div class="Allselect-stores">
				<p>Name</p>
				<input placeholder="联系人姓名" type="text" v-model="nameInput" />
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Telephone</p>
				<input placeholder="填写联系人电话" v-model="phoneInput" maxlength="11" type="number" />
				<span></span>
			</div>
			<div class="Allselect-stores Second">
				<p>Note</p>
				<input placeholder="填写备注" v-model="briefInput" type="text" />
				<span></span>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>支付方式</p>
			</div>
		</div>
		<div class="payName">
			<div class="payWeChat" v-for="item in dataPay" :key="item.id" @click="selectPay(item.id)">
				<div class="imgWeChat">
					<img :src="item.img" />
					<p>{{item.payFont}}</p>
				</div>
				<div class="selectImg">
					<img v-if="!item.isshow" src="../assets/images/icon/sele.png" />
					<img v-if="item.isshow" src="../assets/images/icon/select.png" />
				</div>
			</div>
		</div>
		<div class="integralBox">
			<div class="integralFont">
				<p class="uses">使用积分</p>
				<p class="numberInt">（1000积分共抵扣0000元）</p>
			</div>
			<img :src="shutOpent" @click="shutClick" />
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>预约费用</p>
			</div>
		</div>
		<div class="price">
			<div>
				<p>￥ {{calprice}}</p>
				<p>注：提前一天取消预约可退款，当天不可退款</p>
			</div>
		</div>
		<div class="submit" @click="submit">
			<button>立即预约</button>
		</div>
		<div style="height:3rem;"></div>
		<!-- 选择门店 -->
		<wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="name" @confirm="confirmPerson" />
		<!-- 选择项目 -->
		<wv-picker :visible.sync="fruitPickerShow2" :columns="fruitColumns2" value-key="name" @confirm="confirmPerson2" />
		<!-- 选择医生 -->
		<wv-picker :visible.sync="fruitPickerShow3" :columns="fruitColumns3" value-key="name" @confirm="confirmPerson3" />
	</div>
</template>

<script>
	import Vue from 'vue';
	import * as api from '@/assets/js/api';
	import {
		Toast,
		Picker,
		Group,
		Dialog,
		Cell
	} from 'we-vue';

	Vue.use(Picker).use(Group).use(Cell);
	export default {
		data() {
			return {
				nameInput: '',
				phoneInput: '',
				briefInput: '',
				listDateInfo: '', //日期段，明天起的30天
				listPeriodInfo: '', //时间段
				perId: 0, //选中时间段内容
				pubicFunction: '', //请求数据方法
				ifSee: false, //是否显示查看项目详情
				calprice: 0, //价钱
				date1: '', //选择日期
				stores: {
					name: '选择门店(必填)'
				},
				listConA1: '', //改变颜色
				listConA2: '', //改变颜色
				listConA3: '', //改变颜色
				fruitPickerShow: false,
				fruitColumns: [{
					values: []
				}],
				subjects: {
					name: '选择项目(必填)'
				},
				fruitPickerShow2: false,
				fruitColumns2: [{
					values: []
				}],
				doctor: {
					name: '选择医生(选填)'
				},
				fruitPickerShow3: false,
				fruitColumns3: [{
					values: []
				}],
				shutOpent: require('../assets/images/icon/shut.png'),
				shutOpentId: 1, //1=不使用积分2=使用积分
				dataPayId: 1, //1=微信支付2=余额支付
				dataPay: [{
						id: 1,
						img: require('../assets/images/icon/wechat.png'),
						payFont: '微信支付',
						isshow: true
					},
					{
						id: 2,
						img: require('../assets/images/icon/wallet.png'),
						payFont: '余额支付',
						isshow: false
					}
				],
			};
		},
		created: function() {
			let that = this;
			this.$store.commit('showBottomNav', {
				isShow: true
			});
			this.pubicFunction = function(doctorid) {
				console.log('-------aaaa', doctorid);
				api.goAppointment({
					data: {
						openid: that.$store.state.uid,
						doctorid: doctorid,
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('预约', res.data);
						for (let i in res.data.listDate) {
							res.data.listDate[i].date = res.data.listDate[i].date.substring(5, res.data.listDate[i].date.leng);
							switch (res.data.listDate[i].dow) {
								case 1:
									res.data.listDate[i].dow = "日";
									break;
								case 2:
									res.data.listDate[i].dow = "一";
									break;
								case 3:
									res.data.listDate[i].dow = "二";
									break;
								case 4:
									res.data.listDate[i].dow = "三";
									break;
								case 5:
									res.data.listDate[i].dow = "四";
									break;
								case 6:
									res.data.listDate[i].dow = "五";
									break;
								case 7:
									res.data.listDate[i].dow = "六";
									break;
							}
						}
						that.listDateInfo = res.data.listDate;
						that.listPeriodInfo = res.data.listPeriod;
						that.fruitColumns[0].values = res.data.listHosp;
						that.calprice = res.data.cashBal;
						if (doctorid == '') {
							that.fruitColumns2[0].values = '';
							that.fruitColumns3[0].values = '';
						} else {
							that.listConA1 = 'listConA';
							that.listConA2 = 'listConA';
							that.stores.name = res.data.listHosp[0].name;
							that.subjects.name = res.data.listProject[0].name;
							that.fruitColumns3[0].values = res.data.listDoctor;
						}
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				})
			};
			if (this.$route.query.ReserveId != undefined) {
				this.pubicFunction(this.$route.query.ReserveId);
			} else {
				this.pubicFunction('');
			}
			console.log(this.$route.query.ReserveId, '----aaa');
			// if(session.Lstorage.getItem('ReserveId')){}
			// session.Lstorage.setItem('ReserveId', session.Lstorage.getItem('doctorId'));
		},
		methods: {
			submit: function(res) {
				let that = this;
				let isPhone = /^1(3|4|5|7|8)\d{9}$/;
				if (!isPhone.test(this.phoneInput)) {
					Toast.text({
						duration: 1000,
						message: '请输入正确格式的手机号'
					});
					return;
				}
				if (this.nameInput == "") {
					Toast.text({
						duration: 1000,
						message: '预约人姓名不能为空'
					});
					return;
				}
				console.log(this.date1, this.perId);
				if (this.date1 == "" || this.perId == 0) {
					Toast.text({
						duration: 1000,
						message: '请选择时间段'
					});
					return;
				}
				// 提交内容
				console.log('门店', this.stores.name);
				console.log('项目', this.subjects.name);
				console.log('医生', this.doctor.name);
				console.log('名字', this.nameInput);
				console.log('电话', this.phoneInput);
				console.log('备注', this.briefInput);
				// shutOpentId: 1, //1=不使用积分2=使用积分
				// dataPayId: 1, //1=微信支付2=余额支付
				let subDate, subDow, subPeriod;
				for (let i in that.listDateInfo) {
					if (that.listDateInfo[i].date === that.date1) {
						subDate = that.listDateInfo[i].date;
						subDow = that.listDateInfo[i].dow;
					}
				}
				for (let i in that.listPeriodInfo) {
					if (that.listPeriodInfo[i].id === that.perId) {
						subPeriod = that.listPeriodInfo[i].period;
					}
				}
				Dialog.confirm({
						title: '提示',
						message: '您预约的是' + subDate + ',星期' + subDow + ',' + subPeriod,
						skin: 'ios',
						showCancelButton: true
					})
					.then(() => {


// 待修改内容
					})
					.catch(() => {

					});
			},
			shutClick: function() {
				if (this.shutOpent == require('@/assets/images/icon/shut.png')) {
					this.shutOpent = require('@/assets/images/icon/open.png');
					this.shutOpentId = 2;
				} else {
					this.shutOpent = require('@/assets/images/icon/shut.png');
					this.shutOpentId = 1;
				}
			},
			selectPay: function(id) {
				this.dataPayId = id;
				for (var i = 0; i < this.dataPay.length; i++) {
					if (id == this.dataPay[i].id) {
						this.dataPay[i].isshow = true;
					} else {
						this.dataPay[i].isshow = false;
					}
				}
			},
			clickList: function(res) {
				// 选择日期
				this.date1 = res;
			},
			clickPeriod: function(res) {
				this.perId = res;
			},

			doctorJECt: function() {
				this.fruitPickerShow3 = true;
			},
			confirmPerson3: function(picker) {
				if (picker.getValues()[0] == undefined) {
					this.fruitPickerShow3 = false;
					return;
				}
				this.doctor = picker.getValues()[0];
				this.listConA3 = 'listConA';
			},
			prickject: function() {
				this.fruitPickerShow2 = true;
			},
			confirmPerson2: function(picker) {
				if (picker.getValues()[0] == undefined) {
					this.fruitPickerShow2 = false;
					return;
				}
				api.getProjectDoctorList({
					data: {
						openid: this.$store.state.uid,
						projectid: picker.getValues()[0].id
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('----数据哦aaaaaaa', res.data);
						this.fruitColumns3[0].values = res.data.listDoctor;
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
				this.subjects = picker.getValues()[0];
				this.listConA2 = 'listConA';
				this.ifSee = true;
			},
			prickPro: function() {
				this.fruitPickerShow = true;
			},
			confirmPerson: function(picker) {
				if (picker.getValues()[0] == undefined) {
					this.fruitPickerShow = false;
					return;
				}
				api.getHospitalProjectList({
					data: {
						openid: this.$store.state.uid,
						hospid: picker.getValues()[0].id
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('----数据哦', res.data);
						this.fruitColumns2[0].values = res.data.listProject;
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
				this.stores = picker.getValues()[0];
				this.listConA1 = 'listConA';
			}
		},
	};
</script>


<style scoped="scoped" lang="scss">
	@import '@/assets/css/reserve.scss';
</style>
