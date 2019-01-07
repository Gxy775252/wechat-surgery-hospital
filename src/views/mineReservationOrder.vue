<template>
	<div class="all">
		<div class="navList">
			<div>
				<p>全部</p>
				<p></p>
			</div>
			<div>
				<p>未核销</p>
				<p></p>
			</div>
			<div>
				<p>已核销</p>
				<p></p>
			</div>
		</div>
		<div class="conList">
			<div class="top">
				<p class="hexiao">未核销</p>
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
			<div class="bottom">
				<div class="bottom-left">
					<p>已付金额：</p>
					<p>￥299</p>
				</div>
				<div class="bottom-right">
					<button class="color">去核销</button>
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
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineReservationOrder.scss';
</style>
