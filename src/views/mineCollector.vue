<template>
	<div class="all">
		<div class="listAll">
			<div class="insList">
				<div class="insImg">
					<img :src="doctorImgNull" />
				</div>
				<div class="insInfo">
					<p>活力你那加的夫</p>
					<p>欢子u卓越的医疗美容仪器顶尖医学专家</p>
				</div>
				<div class="inspirce">
					<p>￥ 99</p>
					<div>
						<img src="../assets/images/icon/select.png" />
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
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
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineCollector.scss';
</style>
