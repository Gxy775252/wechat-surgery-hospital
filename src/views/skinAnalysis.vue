<template>
	<div>
		<div class="topSelect">
			<select class="selectCon" v-for="(item,key,index) in selectList" :key="key" @change="selectChange(optionId)" v-model="optionId">
				<option :value="-1">请选择</option>
				<option :value="item.id">{{item.title}}</option>
			</select>
		</div>
		<div class="case">
			<div class="caseBox">
				<div v-html="detailInfo.content1"></div>
			</div>
			<div class="zlImg">
				<img src="../assets/images/icon/zhiliao.png" />
			</div>
			<div class="caseBox" style="margin-top: 0;margin-bottom:1.66rem;">
				<div v-html="detailInfo.content2"></div>
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
	import {
		Toast
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	export default {
		data() {
			return {
				optionId: -1,
				selectList: '',
				detailInfo: '',
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			this.optionId = this.$route.params.selectId;
			api.getQaList({
				data: {
					openid: this.globalData.openid
				}
			}).then(res => {
				if (res.data.flag) {
					this.selectList = res.data.listQa; //下拉框
				} else {
					Toast.text({
						duration: 1000,
						message: '请求失败'
					});
				}
			});
			api.getQaDetail({
				data: {
					openid: this.globalData.openid,
					id: this.$route.params.selectId,
				}
			}).then(res => {
				if (res.data.flag) {
					console.log("数据内容", res.data);
					this.detailInfo = res.data.detail;
				} else {
					Toast.text({
						duration: 1000,
						message: '请求失败'
					});
				}
			});
		},
		methods: {
			selectChange: function(res) {
				// 选择下拉列表内容
				console.log(res);
			},
			// api.getQaList({
			// 				data: {
			// 					openid: this.globalData.openid,
			// 					id: res,
			// 				}
			// 			}).then(res => {
			// 				if (res.data.flag) {
			// 					console.log("数据内容", res.data);
			// 				} else {
			// 					Toast.text({
			// 						duration: 1000,
			// 						message: '请求失败'
			// 					});
			// 				}
			// 			});
		}
	}
</script>
<style lang="scss" scoped>
	@import '@/assets/css/skinAnalysis.scss';
</style>
