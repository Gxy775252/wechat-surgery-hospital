<template>
	<div>
		<div class="head">
			<div class="headimg">
				<img src="../assets/images/example/doctor.png" />
			</div>
			<div class="headText">
				<p>用户姓名</p>
				<p>做过的项目：抽脂瘦大腿，打水光针</p>
			</div>
		</div>
		<div class="diaryList">
			<div class="list">
				<p>日期</p>
				<div class="list-right">
					<p>选择日期</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list" @click="goSelect">
				<p>项目名称</p>
				<div class="list-right">
					<p>选择用户做过的项目（选择订单）</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">描述</div>
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
<!-- <template>
	<div>
		<div class="head">
			<div class="headimg">
				<img :src="dateinfo.headimg" />
			</div>
			<div class="headText">
				<p>{{dateinfo.name}}</p>
				<p>做过的项目：{{dateinfo.prjtList}}</p>
			</div>
		</div>
		<div class="diaryList">
			<div class="list">
				<p>日期</p>
				<div class="list-right">
					<p>选择日期</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="list">
				<p>项目名称</p>
				<div class="list-right">
					<p>选择用户做过的项目（选择订单）</p>
					<div class="right-div">
						<img src="@/assets/images/icon/mineHore.png" />
					</div>
				</div>
			</div>
			<div class="question">
				<div class="checkbox-title" style="padding-bottom: calc(1rem / 2);">描述</div>
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
			dateinfo:'',
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	created: function() {
		var id = this.$route.params.id;
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goDoctorDiaryAdd({
			data: {
				openid: this.$store.state.uid,
				id:id
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生上传美丽日记', res.data);
				this.dateinfo = res.data.vip
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
@import '@/assets/css/stationingUpload.scss';
@import '@/assets/css/mineDiary.scss';
</style>
