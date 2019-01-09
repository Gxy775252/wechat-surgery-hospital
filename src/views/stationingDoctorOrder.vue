<template>
	<div class="all">
		<div class="navList">
			<div>
				<p>全部</p>
				<p></p>
			</div>
			<div>
				<p>未完成</p>
				<p></p>
			</div>
			<div>
				<p>已完成</p>
				<p></p>
			</div>
		</div>
		<div class="conList">
			<div class="name">
				<div class="name-left">
					<p>用户<span></span></p>
					<p>用户姓名</p>
				</div>
				<div class="name-right">未完成</div>
			</div>
			<div class="top">
				<div>
					<p>预约时间</p>
					<p>11月10日 14：00</p>
				</div>
				<div>
					<p>预约门店</p>
					<p>北京市朝阳区门店</p>
				</div>
				<div>
					<p>预约项目</p>
					<p>打水光针</p>
				</div>
				<div>
					<p>预约医生</p>
					<p>哈哈哈</p>
				</div>
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
@import '@/assets/css/stationingDoctorOrder.scss';
</style>
