<!-- 美丽日记详情 -->
<template>
	<div>
		<div class="userBox">
			<div class="userImg"><img :src="detailInfo.headimg"></div>
			<div class="userFont">
				<p class="userName">{{detailInfo.vipName}}</p>
				<p class="userTitle">项目名称：{{detailInfo.prjName}}</p>
			</div>
		</div>
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>项目医生</p>
		</div>
		<div class="doctorBox">
			<div class="doctorImgName">
				<div class="doctorImg"><img src="@/assets/images/example/doctor.png"></div>
				<!-- 待修改 医生头像未处理 -->
				<div class="doctorFont">
					<p class="doctorName">{{detailInfo.doctorName}}</p>
					<p class="doctorTitle">{{detailInfo.doctorTitle}}</p>
					<p class="doctorAdd">所在门店所在门店 | {{detailInfo.hospName}}</p>
				</div>
			</div>
			<div class="doctorHorn"><img src="../assets/images/icon/horn.png"></div>
		</div>
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>日记详情</p>
		</div>
		<div class="mation">
			<div class="mationCenter">
				<div v-for="(item,key,index) in listResourceInfo" :key="key">
					<img :src="item.cover || ImgNull" /> 
					<div class="playImg" v-if="item.isVideo==1">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
			</div>
			<div class="mationCon">
				<p><span>[{{detailInfo.prjName}}-第{{detailInfo.dayIndex}}天]</span>{{detailInfo.content}}</p>
			</div>
		</div>			
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>美丽日记</p>
		</div>
		<div>
			<div class="diaryList">
				<p class="yearFont">2018年</p>
				<p class="yearFontA">Beautiful Diary</p>
				<div class="monthBox" v-for="(item,key,index) in listDiaryInfo" :key="key">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>{{item.date10}}</p>
					</div>
					<div class="listContent">
						<div class="contentBox">
							<div v-for="(item2,key,index) in item.listResource" :key="key">
								<img :src="item2.cover || ImgNull">
								<!-- 待修改 图片资源 项目名 天数 -->
								<div class="playImg" v-if="item2.isVideo==1">
									<img src="@/assets/images/icon/playImg.png" />
								</div>
							</div>
						</div>
						<div class="listFont">
							<!-- 待修改 项目名  天数 -->
							<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>{{item.content}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom_btn">
			<button type="button" name="button" class="btnA">在线预约</button>
			<button type="button" name="button" class="btnB">在线咨询</button>
		</div>
		<div style="height: 3rem;"></div>
	</div>
</template>

<script>
import { Toast } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'diaryDetails',
	data() {
		return {
			detailInfo: '', //日记详情
			listResourceInfo: '', //本日记资源
			listDiaryInfo: '', //本项目日记列表
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getdiaryDetails({
			data: {
				openid: this.$store.state.uid,
				// id: session.Lstorage.setItem('diaryId')
				id: 1
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('美丽日记详情数据', res.data);
				this.detailInfo = res.data.detail; //日记详情
				this.listResourceInfo = res.data.listResource; //本日记资源
				this.listDiaryInfo = res.data.listDiary; //本项目日记列表
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	}
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/diaryDetails.scss';
</style>
