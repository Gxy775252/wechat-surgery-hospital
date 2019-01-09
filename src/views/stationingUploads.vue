<template>
	<div class="all">
		<div class="lists">
			<div class="lists-left">
				<div class="img">
					<img src="../assets/images/icon/sele.png" />
				</div>
			</div>
			<div class="lists-right">
				<div class="conList">
					<div class="name">
						<div class="name-left">
							<p>用户<span></span></p>
							<p>用户姓名</p>
						</div>
					</div>
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
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/stationingUploads.scss';
</style>
