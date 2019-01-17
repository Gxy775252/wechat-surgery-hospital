<template>
	<div class="all">
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
					<input placeholder="填写项目名称" />
					<div class="right-div ">
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
						<img :src="ImgNull" />
					</div>
					<div style="clear: both;"></div>
				</div>
			</div>
			<div style="height: 3rem;"></div>
		</div>
		<div class="buttonA" v-if="ifEdit">
			<button>编辑</button>
		</div>
		<div class="buttonA" v-if="!ifEdit" @click="submitA">
			<button>提交</button>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import Vue from 'vue';
import * as session from '@/assets/js/session';
import { Textarea, Toast } from 'we-vue';
Vue.use(Textarea);
export default {
	data() {
		return {
			ImgNull: this.$store.state.ImgNull,
			diaryInfo: '',
			ifEdit: false
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		if (!session.Lstorage.getItem('ifNewly')) {
			this.ifEdit = true;
			api.getVipDiaryDetail({
				data: {
					openid: this.$store.state.uid,
					diaryid: session.Lstorage.getItem('ListsID')
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('我的日记详情', res.data);
					this.diaryInfo = res.data.diary;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		}
	},
	methods: {
		submitA: function() {
			// 提交内容
// 			api.saveDiary({
// 				data: {
// 					openid: this.$store.state.uid,
// 					diaryid:0,//0=新增
// 					orderid:,
// 					date:,
// 					content:,
// 					resourceList:,
// 					dayIndex:,
// 				}
// 			}).then(res => {
// 				if (res.data.flag) {
// 					console.log('提交日记详情', res.data);
// 				} else {
// 					Toast.text({
// 						duration: 1000,
// 						message: res.data.msg
// 					});
// 				}
// 			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiaryLists.scss';
@import '@/assets/css/mineDiary.scss';
</style>
