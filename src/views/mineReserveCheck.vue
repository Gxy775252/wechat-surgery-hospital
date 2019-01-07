<template>
	<div class="all">
		<div class="top2">
			<p>已核销</p>
			<p>积分奖励500，已发放至你的积分账户</p>
		</div>
		<div class="doctor">
			<div class="doctorTop">
				<div class="topImg">
					<img :src="doctorImgNull" />
				</div>
				<div class="topText">
					<div>
						<p class="fontA">黄伟医生</p>
						<p class="fontB"></p>
						<p class="fontC">整形医院五官精雕主任</p>
					</div>
					<p>多功能细胞与字体脂肪移植课题研究组成员中华医学学会于学美容协会</p>
				</div>
			</div>
			<div class="doctorBottom">
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
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineReserveCheck.scss';
</style>
