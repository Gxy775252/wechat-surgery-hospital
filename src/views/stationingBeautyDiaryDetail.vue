<template>
	<div>
		<div class="diaryList">
			<div class="list">
				<p>日期</p>
				<div class="list-right">
					<p>日期选择</p>
				</div>
			</div>
			<div class="list">
				<p>项目名称</p>
				<div class="list-right" @click>
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
<!-- <template>
	<div>
		<div class="diaryList">
			<div class="list">
				<p>日期</p>
				<div class="list-right">
					<p>{{diaryinfo.date10}}</p>
				</div>
			</div>
			<div class="list">
				<p>项目名称</p>
				<div class="list-right" @click="goSelect">
					<p>选择用户做过的项目</p>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">描述</div>
				<div class="question-textarea">
					<wv-textarea placeholder="请输入文本"  :rows="4">
						{{diaryinfo.content}}
					</wv-textarea>
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
</template> -->
<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import { Textarea } from 'we-vue';
Vue.use(Textarea);
export default {
	data() {
		return {
			birthday: '选择日期',
			doctorImgNull: this.$store.state.doctorImgNull,
			diaryinfo:'',
			listVideo:''
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goDoctorDiaryDetail({
			data: {
				openid: this.$store.state.uid,
				id:1
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生日记详情', res.data);
				this.diaryinfo = res.data.diary
				this.listVideo = res.data.listVideo
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods:{
		goSelect:function(){
			this.$router.push({ name: 'stationingUploads'})
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiary.scss';
@import '@/assets/css/stationingBeautyDiaryDetail.scss';
</style>
