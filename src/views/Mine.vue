<template>
	<div class="all">
		<div class="mine">
			<div class="mine-Top">
				<div class="head">
					<img :src="vipInfo.headimg" />
				</div>
				<p>{{vipInfo.name}}</p>
				<div class="qrCode">
					<img src="../assets/images/icon/qrCode.png" />
				</div>
			</div>
			<div class="mine-bottom">
				<div>
					<p>{{vipInfo.scoreBal || 0}}</p>
					<p>我的积分</p>
				</div>
				<div>
					<p>{{vipInfo.cashBal || 0}}</p>
					<p>我的余额</p>
				</div>
				<div>
					<p>{{vipInfo.fans || 0}}</p>
					<p>我的拉新</p>
				</div>
			</div>
		</div>
		<div class="list" style="margin-top:calc(4rem/2)">
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
		<div class="list">
			<p>我的美丽日记</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list">
			<p>我的商城收藏</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list">
			<p>完善个人信息</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list">
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
		}
	}
</script>


<style lang="scss" scoped>
	@import '@/assets/css/mine.scss';
</style>
