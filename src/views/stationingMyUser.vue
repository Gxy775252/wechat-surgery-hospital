<template>
	<div class="all">
		<div class="newList-list">
			<div class="head">
				<div class="headimg">
					<img src="../assets/images/example/doctor.png" />
				</div>
				<div class="headText">
					<p>用户姓名</p>
					<p>做过的项目：抽脂瘦大腿，打水光针</p>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-left">
					<p></p>
					<p></p>
				</div>
				<div class="bottom-right">
					<button class="colorB">查看美丽日记</button>
					<button class="colorA">上传美丽日记</button>
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
@import '@/assets/css/stationingMyUser.scss';
</style>
