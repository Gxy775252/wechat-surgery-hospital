<template>
	<div class="all">
		<div class="diaryList">
			<div class="list">
				<p>皮肤检测</p>
				<div class="list-right">
					<p>去检测皮肤</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>您的肤质</p>
				<div class="list-right">
					<p>请选择您的肤质</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>是否做过整容项目</p>
				<div class="select">
					<div class="select-on">
						<div>
							<img src="@/assets/images/icon/sele.png" />
						</div>
						<p>是</p>
					</div>
					<div class="select-on">
						<div>
							<img src="@/assets/images/icon/sele.png" />
						</div>
						<p>否</p>
					</div>
				</div>
			</div>
			<div class="checkbox">
				<div class="checkbox-title">做过的整容项目<p>（勾选您做过的整容项目，可多选）</p>
				</div>
				<div class="checkbox-con">
					<div class="content">
						<div>
							<img src="@/assets/images/icon/checkbox.png" />
						</div>
						<p>抽脂瘦大腿</p>
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">需要解决的问题以及期望</div>
				<div class="question-textarea">
					<wv-textarea placeholder="请输入文本" :rows="4"></wv-textarea>
				</div>
			</div>
			<div class="img">
				<div class="checkbox-title" style="padding-bottom: calc(3.2rem / 2);">上传照片或者视频（最多5张）</div>
				<div class="imgA">
					<div class="imgA-An">
						<img :src="doctorImgNull" />
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div style="height: 6rem;"></div>
		</div>
		<div class="buttonA">
			<button>提交</button>
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
</style>
