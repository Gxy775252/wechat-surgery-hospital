<template>
	<div class="all">
		<div class="top">
			<div class="top-left">
				<p>待支付</p>
				<p>剩余3小时1分29秒</p>
			</div>
			<div class="top-right">
				<img src="../assets/images/icon/daizhifu.png" />
			</div>
		</div>
		<div class="dizhi">
			<div>
				<p>收件人：丁冰</p>
				<p>电话：182468437912154</p>
			</div>
			<p>地址：北京市朝阳区安立路长新大厦401</p>
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
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div class="bottomOperation">
			<div class="leftOperation">￥279</div>
			<div class="centerOperation">取消订单</div>
			<div class="rightOperation">立即付款</div>
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
	@import '@/assets/css/minePaymentOrder.scss';
</style>
