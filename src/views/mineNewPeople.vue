<template>
	<div class="all">
		<div class="newList">
			<div class="newList-time">
				<p>2018年7月</p>
				<p>+2000积分</p>
			</div>
			<div class="newList-list">
				<div class="head">
					<div class="headimg">
						<img src="../assets/images/example/doctor.png" />
					</div>
					<div class="headText">
						<p>小品</p>
						<p>7月10日注册陈公公</p>
					</div>
				</div>
				<p>+500积分</p>
			</div>
		</div>
	</div>
</template>

<script>
	import * as api from '@/assets/js/api';
	export default {
		data() {
			return {

			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineNewPeople.scss';
</style>
