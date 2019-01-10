<template>
	<div>
		<div class="topSelect">
			<select class="selectCon">
				<option>色斑</option>
				<option>去办</option>
				<option>随便什么版</option>
			</select>
		</div>
		<div class="case">
			<div class="caseBox">
				<p>色斑 Pigmentation</p>
				<div>
					除了阳光外，遗传，污染，甚至自己的荷尔蒙，都能引致恼人不堪的色素问题
				</div>
			</div>
			<div class="zlImg">
				<img src="../assets/images/icon/zhiliao.png" />
			</div>
			<div class="caseBox" style="margin-top: 0;margin-bottom:1.66rem;">
				<p>果酸换肤 Pigmentation</p>
				<div>
					除了阳光外，遗传，污染，甚至自己的荷尔蒙，都能引致恼人不堪的色素问题
				</div>
			</div>
		</div>
		<div style="width:100;background-color: #f7f7f7;height:calc(4.66rem/2);"></div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		    <div class="bottom_btn">
		  <button type="button" name="button">在线预约</button>
		  <button type="button" name="button">在线咨询</button>
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
		},
	}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/skinAnalysis.scss';
</style>
