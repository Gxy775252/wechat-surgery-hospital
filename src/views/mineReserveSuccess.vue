<template>
	<div class="all">
		<div class="top2">
			<p>支付成功</p>
			<p>线下出示二维码进行核销</p>
		</div>
		<div class="code">
			<div class="code-img">
				<img src="../assets/images/icon/newQRcode.png" />
			</div>
		</div>
		<div class="conList">
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
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div class="bottom">
			<button>取消预约</button>
		</div>
		<!-- 取消预约 -->
		<div class="model">
			<div class="modelwhite">
				<div class="modelimg">
					<img src="../assets/images/icon/quxiao.png" />
				</div>
				<p class="title">您确定要取消预约吗？</p>
				<p class="brief">提前一天取消预约可退款，当天不可退款</p>
				<div class="phone">
					<p>如有疑问，请联系客服</p>
					<p>400-10203948</p>
				</div>
				<div class="buttonA">
					<button style="color:#666">再考虑考虑</button>
					<button style="color: #008e83;border-left:2px solid #fafafa;">确定</button>
				</div>
			</div>
		</div>
		<!-- 取消预约 END-->
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
@import '@/assets/css/mineReserveSuccess.scss';
</style>
