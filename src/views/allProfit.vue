<template>
	<div class="all">
		<div class="top">
			<p>2018年12月12日充值100000元</p>
			<p>年化利率6.00% &nbsp;&nbsp;&nbsp;&nbsp;截至日期2018/12/12-2019/12/12</p>
		</div>
		<div class="dayList">
			<div class="dayList-date">2019/21/21</div>
			<div class="dayList-num">+10</div>
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
	@import '@/assets/css/allProfit.scss';
</style>
