<template>
	<div class="all">
		<div class="head">
			<div class="headImg">
				<img src="@/assets/images/example/doctor.png" />
			</div>
			<p>丁冰</p>
		</div>
		<div class="list" style="margin-top:calc(4rem/2)">
			<p>预约订单</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list">
			<p>我的客户</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	}
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/stationingDoctorPersonalCenter.scss';
</style>
