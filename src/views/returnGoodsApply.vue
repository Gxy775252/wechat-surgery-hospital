<template>
	<div class="all">
		<div class="list">
			<p>退货原因</p>
			<div class="list-right">
				<input placeholder="选择退货原因" />
			</div>
		</div>
		<div class="textarea">
			<p>问题描述</p>
			<div class="textarea-right">
				<wv-textarea placeholder="请输入文本" :rows="3":max-length="10"></wv-textarea>
			</div>
		</div>
		<div class="list">
			<p>退款金额</p>
			<div class="list-right">
				<input placeholder="￥ 199.00" />
			</div>
		</div>
		<div class="upload">
			<p>上传凭证</p>
			<div class="upload-img">
				<div>
					<img src="../assets/images/icon/upload.png" />
				</div>
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
	@import '@/assets/css/returnGoodsApply.scss';
</style>
