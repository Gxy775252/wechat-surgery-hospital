<template>
	<div class="all">
		<div class="top2">
			<p>已完成</p>
			<p>用户已完成预约项目</p>
		</div>
		<div class="doctorName">
			<div class="doctorNameTop">
				<div class="topImgA">
					<img :src="doctorImgNull" />
				</div>
				<div class="doctorNameBottom">
					<div>
						<p>预约时间</p>
						<p>11月10日 14：00</p>
					</div>
					<div>
						<p>预约门店</p>
						<p>北京市朝阳区门店</p>
					</div>
					<div>
						<p>预约项目</p>
						<p>打水光针</p>
					</div>
				</div>
			</div>
		</div>
		<div class="seeBingLi">
			<div class="seeBingLi-left">
				<p class="fontA">查看病例</p>
				<p class="fontB"></p>
				<p class="fontC">View Cases</p>
			</div>
			<div class="seeBingLi-right">
				<img src="@/assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>治疗过程</p>
			</div>
		</div>
		<div class="white">
			<div>
				治疗结果，文字图片视频
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>治疗结果</p>
			</div>
		</div>
		<div class="white">
			<div>
				治疗结果，文字图片视频
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>追踪术后信息</p>
			</div>
		</div>
	</div>
</template>

<script>
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
@import '@/assets/css/stationingDoctorOrderDetail.scss';
@import '@/assets/css/mineReserveCheck.scss';
</style>
