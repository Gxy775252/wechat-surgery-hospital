<template>
	<div class="all">
		<div class="list">
			<p>旧密码</p>
			<input placeholder="请输入旧密码" />
		</div>
		<div class="list">
			<p>新密码</p>
			<input placeholder="请输入新密码" />
		</div>
		<div class="list">
			<p>确认密码</p>
			<input placeholder="请确认新密码" />
		</div>
		<div class="info">
			<p>积分赠送密码不能是重复，连续的数字，最少6个数字</p>
		</div>
		<div class="buttonA">
			<button>确定</button>
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
	@import '@/assets/css/setupPW.scss';
</style>
