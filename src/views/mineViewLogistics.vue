<template>
	<div class="all">
		<div class="top">
			<div class="topImg">
				<img src="../assets/images/icon/wuping.png" />
			</div>
			<div class="topText">
				<p class="text-top">1件商品</p>
				<p class="text-bottom">快递：快递100</p>
				<p class="text-bottom">快递单号：274934779</p>
			</div>
		</div>
		<div class="box">
			<div class="diaryList">
				<p class="yearFont">物流详情</p>
				<p class="yearFontA">Logistics details</p>
				<div class="monthBox">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>您的宝贝正在派件</p>
					</div>
					<div class="con">
						<p>派件员 王强 18293829302 正在为您派件</p>
					</div>
					<div class="con">
						<p>2017-04-01 12：00：00</p>
					</div>
				</div>
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
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
	@import '@/assets/css/mineViewLogistics.scss';
</style>
