<template>
	<div class="all">
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
		<div class="list">
			<div class="list-text">
				<p>仅退款</p>
				<p>未收到货</p>
			</div>
			<div class="list-img">
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list">
			<div class="list-text">
				<p>退货/退款</p>
				<p>已收到货，需要退回已收到的货物</p>
			</div>
			<div class="list-img">
				<img src="../assets/images/icon/mineHore.png" />
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
	@import '@/assets/css/returnGoodsChoice.scss';
</style>
