<template>
	<div class="all">
		<div class="navList">
			<div>
				<p>全部</p>
				<p></p>
			</div>
		</div>
		<div class="conList">
			<div class="top">
				<p>订单编号：24783647878</p>
				<p>待支付</p>
			</div>
			<div class="center">
				<div class="center-left">
					<div class="leftImg">
						<img src="../assets/images/example/tuFour.png" />
					</div>
					<div class="leftText">
						<p>活力眼尖的</p>
						<p>规格：200ml</p>
					</div>
				</div>
				<div class="center-right">
					<p>￥ 299</p>
					<p>x1</p>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-left">
					<p>已付金额：</p>
					<p>￥299</p>
				</div>
				<div class="bottom-right">
					<button class="color">退货/退款</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineOrder.scss';
</style>

