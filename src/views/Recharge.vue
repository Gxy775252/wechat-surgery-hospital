<template>
	<div class="all">
		<div class="top">
			<div class="top-con">
				<p>总金额（元）</p>
			</div>
			<p>3000000.00</p>
		</div>
		<div class="list">
			<p>请选择充值金额</p>
			<div class="allList">
				<p class="colorA">5000元</p>
			</div>
		</div>
		<div class="recharge">
			<div class="recharge-title">
				<p>充值规则</p>
			</div>
			<div class="textarea">
				在11月11欸咯暂告就阿都拉大哥哦遭到攻击和v鞛啊不过jar和别处挂机呢了嘎跌幅超过把两个爱国
			</div>
		</div>
		<div class="button">
			<button>确定充值</button>
		</div>
		<!-- 充值成功 -->
		<!-- <Tan-Chuang>
			<div class="slotImg">
				<img src="@/assets/images/icon/success.png" />
			</div>
			<p class="slotP">恭喜你，充值成功</p>
			<div class="slotDiv">
				<p>获得1000积分商城支付可抵扣</p>
			</div>
		</Tan-Chuang> -->
		<!-- 充值成功 END-->
	</div>
</template>

<script>
	import TanChuang from '@/components/tanChuang';
	export default {
		data() {
			return {};
		},
		components: {
		    TanChuang
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/Recharge.scss';
</style>
