<template>
	<div class="all">
		<div class="top2">
			<p>已核销</p>
			<p>积分奖励500，已发放至你的积分账户</p>
		</div>
		<div class="doctor">
			<div class="doctorTop">
				<div class="topImg">
					<img :src="doctorImgNull" />
				</div>
				<div class="topText">
					<div>
						<p class="fontA">黄伟医生</p>
						<p class="fontB"></p>
						<p class="fontC">整形医院五官精雕主任</p>
					</div>
					<p>多功能细胞与字体脂肪移植课题研究组成员中华医学学会于学美容协会</p>
				</div>
			</div>
			<div class="doctorBottom">
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
		<div class="white">
			<div>
				治疗结果，文字图片视频
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>术后注意事项</p>
			</div>
		</div>
		<div class="white">
			<div>
				治疗结果，文字图片视频
			</div>
		</div>
		<div class="tiShiInfo">
			注：分享成功可获得积分奖励哦！
		</div>
		<div class="QRCode">
			<div>
				<img src="@/assets/images/icon/newQRcode.png"/>
			</div>
			<p>北京塑研医疗美容诊所</p>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div style="height: 5rem;"></div>
		<div class="botton">
			<button>分享订单</button>
		</div>
		<!-- 分享订单 -->
<!-- 		<Tan-Chuang>
			<div class="slotImg">
				<img src="@/assets/images/icon/fenxiang.png" />
			</div>
			<p class="slotP">恭喜你，分享成功</p>
			<div class="slotDiv">
				<p>获得1000积分商城支付可抵扣</p>
			</div>
		</Tan-Chuang> -->
		<!-- 分享订单 END-->
	</div>
</template>

<script>
import TanChuang from '@/components/tanChuang';
export default {
	data() {
		return {
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	components: {
		TanChuang
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineReserveCheck.scss';
</style>
