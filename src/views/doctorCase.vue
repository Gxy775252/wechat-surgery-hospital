<template>
	<div>
		<div class="caseTop">
			<p>全部</p>
			<p>全部案例</p>
			<p>全部案例</p>
			<p>全部案例</p>
			<p>全部案例</p>
			<p>全部案例</p>
			<div style="clear:both"></div>
		</div>
		<div class="mation">
			<div class="mationTop">
				<div>
					<img src="@/assets/images/icon/shoppingCart.png" />
				</div>
				<div>
					<p>JuLia</p>
					<p>11月 &nbsp; 12日</p>
				</div>
			</div>
			<div class="mationCenter">
				<div>
					<img src="@/assets/images/example/doctore.png" />
				</div>
				<div>
					<img src="@/assets/images/example/doctor.png" />
				</div>
			</div>
			<div class="mationBottom">
				<p>【医美整形-ST全脸字体脂肪填充-第99天】&nbsp;大家好我又来更新日记啦，现在做完ST全脸脂肪填充已经恢复的很好了</p>
			</div>
			<div class="mationBottom">
				<p style="text-align:right;color:#434c53;">
					1000人来过
				</p>
			</div>
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
		},
	}
</script>

<style lang="scss" scoped>
@import '@/assets/css/doctorCase.scss';
@import '@/assets/css/Index.scss';
</style>
