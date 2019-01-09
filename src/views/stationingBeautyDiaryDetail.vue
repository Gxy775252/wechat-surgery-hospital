<template>
	<div>
		<div class="diaryList">
			<div class="list">
				<p>日期</p>
				<div class="list-right">
					<p>11月3日</p>
				</div>
			</div>
			<div class="list">
				<p>项目名称</p>
				<div class="list-right">
					<p>选择用户做过的项目</p>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">描述</div>
				<div class="question-textarea">
					<wv-textarea placeholder="请输入文本" :rows="4"></wv-textarea>
				</div>
			</div>
			<div class="img">
				<div class="checkbox-title" style="padding-bottom: calc(3.2rem / 2);">照片或视频</div>
				<div class="imgA">
					<div class="imgA-An">
						<img :src="doctorImgNull" />
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import { Textarea } from 'we-vue';
Vue.use(Textarea);
export default {
	data() {
		return {
			birthday: '选择日期',
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiary.scss';
@import '@/assets/css/stationingBeautyDiaryDetail.scss';
</style>
