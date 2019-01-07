<template>
	<div class="all">
		<div class="center">
			<div class="center-left">
				<div class="leftImg">
					<img src="../assets/images/example/tuFour.png" />
				</div>
				<div class="leftText">
					<p>活力眼尖的</p>
					<p>规格：200ml</p>
				</div>
			</div>
			<div class="center-right">
				<p>￥ 299</p>
				<p>x1</p>
			</div>
		</div>
		<div class="upload">
			<p>上传凭证</p>
			<div class="upload-img"></div>
		</div>
		<div class="upload">
			<p>描述您对商品的评价</p>
			<div class="pingjia">
				<wv-textarea placeholder="请输入文本" :rows="6":max-length="10"></wv-textarea>
			</div>
		</div>
		<div class="bottom">
			<button>提交</button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Textarea } from 'we-vue'
Vue.use(Textarea)
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
	@import '@/assets/css/commodityEvaluation.scss';
</style>
