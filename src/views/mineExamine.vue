<template>
	<div class="all">
		<!-- <div class="top">
			<p>核销成功</p>
			<p>二维码线下核销成功</p>
		</div> -->
		<div class="top2">
			<p>支付成功</p>
			<p>线下出示二维码进行核销</p>
		</div>
		<div class="code">
			<div class="code-img">
				<img src="../assets/images/icon/newQRcode.png" />
				<div class="codeOk">
					<img src="../assets/images/icon/ok.png" />
				</div>
			</div>
		</div>
		<div class="center">
			<div class="center-left">
				<div class="leftImg">
					<img src="../assets/images/example/tuFour.png" />
				</div>
				<div class="leftText">
					<p>活力眼尖的</p>
					<p>项目简介</p>
				</div>
			</div>
			<div class="center-right">
				<p>￥ 299</p>
				<p>x1</p>
			</div>
		</div>
		<div class="info">
			<p>订单信息</p>
			<div class="info-con">
				<p>商品金额</p>
				<p>￥ 209</p>
			</div>
			<div class="info-con">
				<p>积分抵扣</p>
				<p>￥ 209</p>
			</div>
			<div class="info-con" style="margin-top:20px;">
				<p>订单编号</p>
				<p>346781654812156</p>
			</div>
			<div class="info-con">
				<p>提交时间</p>
				<p>2018/45/222</p>
			</div>
		</div>
		<div class="divHeight"></div>
		<div class="bottom">
			<button>退款</button>
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
	@import '@/assets/css/mineExamine.scss';
</style>
