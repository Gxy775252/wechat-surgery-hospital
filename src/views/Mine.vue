<template>
	<div class="all">
		<div class="mine">
			<div class="mine-Top">
				<div class="head">
					<img :src="vipInfo.headimg" />
				</div>
				<p>{{vipInfo.name}}</p>
				<div class="qrCode" @click="getnewQRCode">
					<img src="../assets/images/icon/qrCode.png" />
				</div>
			</div>
			<div class="mine-bottom">
				<div @click="getMineNewPeople">
					<p>{{vipInfo.scoreBal || 0}}</p>
					<p>我的积分</p>
				</div>
				<div>
					<p>{{vipInfo.cashBal || 0}}</p>
					<p>我的余额</p>
				</div>
				<div>
					<!-- <router-link to="/mineNewPeople"> -->
					<p>{{vipInfo.fans || 0}}</p>
					<p>我的拉新</p>
					<!-- </router-link> -->
				</div>
			</div>
		</div>
		<div class="list" style="margin-top:calc(4rem/2)" @click="mineReservationOrder">
			<p>我的预约订单</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list">
			<p>我的商城订单</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list" @click="gomineDiary">
			<p>我的美丽日记</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list" @click="getmineCollector">
			<p>我的商城收藏</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list" @click="getmineInfo">
			<p>完善个人信息</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list" @click="getsetupPW(2)">
			<p>积分赠送密码</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
	</div>
</template>

<script>
	import * as api from '@/assets/js/api';
	import {
		Toast,
	} from 'we-vue'
	export default {
		data() {
			return {
				vipInfo: '',
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: true
			});
			api.getVipCentor({
				data: {
					openid: this.globalData.openid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('个人中心', res.data);
					this.vipInfo = res.data.vip;
				} else {
					Toast.text({
						duration: 1000,
						message: '请求失败'
					});
				}
			});
		},
		methods: {
			mineReservationOrder:function(){
				//跳我的预约订单
				this.$router.push({
					name:'mineReservationOrder'
				})
				},
			gomineDiary: function() {
				// 跳我的美丽日记
				this.$router.push({
					name: 'mineDiary'
				});
			},
			getMineNewPeople: function() {
				//跳我的拉新列表
				this.$router.push({
					name: 'mineNewPeople'
				});
			},
			getnewQRCode: function() {
				// 跳拉新二维码页面
				this.$router.push({
					name: 'newQRCode'
				})
			},
			getmineCollector: function() {
				// 跳我的收藏
				this.$router.push({
					name: 'mineCollector'
				})
			},
			getmineInfo: function() {
				// 跳我的信息页面
				this.$router.push({
					name: 'mineInfo'
				})
			},
			getsetupPW: function(res) {
				console.log(res);
				if (res == 1) {
					// 	this.$router.push({
					// 		name: 'setupPW'
					// 	})
					// 待修改   要跳转到设置6位密码的页面
				} else {
					this.$router.push({
						name: 'setupPW'
					})
				}
			}
		},
	}
</script>


<style lang="scss" scoped>
	@import '@/assets/css/mine.scss';
</style>
