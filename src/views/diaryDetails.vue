<template>
	<div>
		<div class="userBox">
			<div class="userImg"><img :src="detailInfo.headimg"></div>
			<div class="userFont">
				<p class="userName">{{detailInfo.vipName}}</p>
				<p class="userTitle">项目名称：{{detailInfo.projectName}}</p>
				<p class="doctorAdd">所在门店 | {{detailInfo.hospName}}</p>
			</div>
		</div>
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>项目医生</p>
		</div>
		<div class="doctorBox">
			<div class="doctorImgName">
				<div class="doctorImg"><img src="@/assets/images/example/doctor.png"></div>
				<div class="doctorFont">
					<p class="doctorName">{{detailInfo.doctorName}}</p>
					<p class="doctorTitle">{{detailInfo.doctorTitle}}</p>
					<p class="doctorAdd">所在门店 | {{detailInfo.hospName}}</p>
				</div>
			</div>
			<div class="doctorHorn"><img src="../assets/images/icon/horn.png"></div>
		</div>
		<div class="lineBox">
			<div class="lineImg"><img src="../assets/images/icon/level.jpg"></div>
			<p>日记详情</p>
		</div>
			
		<div class="mation">
			<div class="mationTop">
				<div>
					<img :src="doctorImgNull" />
				</div>
				<div>
					<p>julia</p>
					<p>11月 &nbsp; 12日</p>
				</div>
			</div>
			<div class="mationCenter">
				<div>
					<img :src="doctorImgNull" />
					<div class="playImg">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
			</div>
			<div class="mationCon">
				<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>大家好我又来更新日记了，现在做完现在做完现在做完现在做完现在做完ST全脸脂肪填充已经恢复很好了，</p>
			</div>
			<div class="textarea">
				图文视频详情
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
								<!-- <img :src="item2.cover"> -->
								<img src="@/assets/images/example/doctor.png" />
							</div>
						</div>
						<div class="listFont">
							<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>{{item.content}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom_btn">
			<button type="button" name="button">在线预约</button>
			<button type="button" name="button">在线咨询</button>
		</div>
		<div style="height: 90px;"></div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
export default {
	data() {
		return {
			detailInfo: '', //日记详情
			listResourceInfo: '', //本日记资源
			listDiaryInfo: '', //本项目日记列表
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getdiaryDetails({
			data: {
				openid: this.globalData.openid,
				// id: this.$route.params,
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
					message: '请求失败'
				});
			}
		});
	}
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/diaryDetails.scss';
</style>
