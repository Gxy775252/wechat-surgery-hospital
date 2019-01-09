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
						<div class="contentBox">
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
		<div class="buttonA">
			<button>上传美丽日记</button>
		</div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
export default {
	data() {
		return {};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineDiaryList.scss';
@import '@/assets/css/seeBeautyDiary.scss';
</style>
