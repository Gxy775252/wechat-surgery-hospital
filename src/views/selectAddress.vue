<template>
	<div class="all">
		<div class="addressLst">
			<div class="listLeft">
				<div>
					<p>王小梦</p>
					<p>15126488999</p>
				</div>
				<p>北京市朝阳区安定路39号长新大厦401</p>
			</div>
			<div class="listRight">
				<p></p>
				<p>编辑</p>
				<p>删除</p>
			</div>
		</div>
		<div class="bottomButton">
			添加新地址
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
			})
		}
	}
</script>

<style lang="scss" scoped>
@import '@/assets/css/selectAddress.scss';
</style>
