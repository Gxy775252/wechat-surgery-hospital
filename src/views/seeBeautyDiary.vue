<!-- <template>
	<div>
		<div class="head">
			<div class="headimg">
				<img :src="vipinfo.headimg" />
			</div>
			<div class="headText">
				<p>{{vipinfo.name}}</p>
				<p>做过的项目：{{vipinfo.prjtList}}</p>
			</div>
		</div>
		<div class="box" >
			<div class="diaryList">
				<p class="yearFont">{{listYearinfo.year}}年</p>
				<p class="yearFontA">Beautiful Diary</p>
				<div class="monthBox">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>{{listDiaryinfo.date10}}</p>
						<div class="function">
							<div class="function-list">
								<div class="bianji"></div>
								<p></p>
							</div>
							<div class="function-list">
								<div class="chakan">
									<img src="../assets/images/icon/public.png" />
								</div>
								<p style="color: #008e83;" @click="onDelete">删除</p>
							</div>
						</div>
					</div>
					<div class="listContent" @click="godetails">
						<div class="contentBox"> -->
							<!-- 待修改，前两个视频 -->
<!-- 							<div>
								<img src="@/assets/images/example/doctor.png" />
							</div>
							<div>
								<img src="@/assets/images/example/doctor.png" />
							</div>
						</div>
						<div class="listFont">
							<p><span>[{{listDiaryinfo.prjName}}-第{{listDiaryinfo.dayIndex}}天]</span>{{listDiaryinfo.content}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div style="height: 6rem;"></div>
		<div class="buttonA" @click="goUpdayend(1)">
			<button>上传美丽日记</button>
		</div>
	</div>
</template> -->
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
		<div class="box">
			<div class="diaryList">
				<p class="yearFont">2018年</p>
				<p class="yearFontA">Beautiful Diary</p>
				<div class="monthBox">
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>10月10日</p>
						<div class="function">
							<div class="function-list">
								<div class="bianji"></div>
								<p></p>
							</div>
							<div class="function-list">
								<div class="chakan">
									<img src="../assets/images/icon/public.png" />
								</div>
								<p style="color: #008e83;">删除</p>
							</div>
						</div>
					</div>
					<div class="listContent">
						<div class="contentBox" @click="godetails">
							<div>
								<img src="@/assets/images/example/doctor.png" />
							</div>
							<div>
								<img src="@/assets/images/example/doctor.png" />
							</div>
						</div>
						<div class="listFont">
							<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>我哟来了，奥地利咖啡机阿里的开发杰拉德发了哈看到</p>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div style="height: 6rem;"></div>
		<div class="buttonA" @click="goUpdayend(1)">
			<button>上传美丽日记</button>
		</div>
	</div>
</template>
<script>
import { Toast } from 'we-vue';
import * as api from '@/assets/js/api';
export default {
	data() {
		return {
			id: '',
			vipinfo: '',
			listYearinfo: '',
			listDiaryinfo: ''
		};
	},
	created: function() {
		var id = this.$route.params.id;
		this.id = id;
		console.log('id', id);
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goDoctorVipDiaryList({
			data: {
				openid: this.$store.state.uid,
				id: 1
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生用户美丽日记', res.data);
				this.vipinfo = res.data.vip;
				this.listYearinfo = res.data.listYear;
				this.listDiaryinfo = res.data.listDiary;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		goUpdayend: function(res) {
			this.$router.push({ name: 'stationingUpload', params: { id: this.id } });
		},
		godetails: function() {
			this.$router.push({ name: 'stationingBeautyDiaryDetail' });
		},
		onDelete: function() {
			api.delVipDiary({
				data: {
					openid: this.$store.state.uid,
					id: 1
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('删除', res.data);
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiaryList.scss';
@import '@/assets/css/seeBeautyDiary.scss';
</style>
