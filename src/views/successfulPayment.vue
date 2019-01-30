<template>
	<div class="all">
		<div class="payment">
			<div class="successIconImg">
				<img src="@/assets/images/icon/successfulPayment.png" />
			</div>
			<p class="successTitle">订单支付成功</p>
			<div class="successBrief">
				<p>您可以去个人中心查看我的订单的进度，也可以返回首页继续利兰其他商品</p>
			</div>
			<div class="successOperation">
				<button @click="seeMine">查看订单</button>
				<button @click="returnIndex">返回首页</button>
			</div>
		</div>
		<div class="successTips">
			<p>温馨提示：</p>
			<p>
				不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作
			</p>
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
		methods: {
			returnIndex: function() {
				this.$router.push({
					name: 'index',
				});
			},
			seeMine: function() {
				this.$router.push({
					name: 'mine',
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/successfulPayment.scss';
</style>
