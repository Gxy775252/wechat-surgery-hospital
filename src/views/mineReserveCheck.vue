<template>
	<div class="all">
		<div class="top2">
			<p>已核销</p>
			<p>积分奖励，已发放至你的积分账户</p>
		</div>
		<div class="doctor">
			<div class="doctorTop">
				<div class="topImg">
					<img :src="ImgNull" />
				</div>
				<div class="topText">
					<div>
						<p class="fontA">{{orderInfo.doctorName}}</p>
						<p class="fontB"></p>
						<p class="fontC">{{orderInfo.doctorTitle}}</p>
					</div>
					<p>{{orderInfo.doctorBrief}}</p>
				</div>
			</div>
			<div class="doctorBottom">
				<div>
					<p>预约时间</p>
					<p>{{orderInfo.date}} {{orderInfo.period}}</p>
				</div>
				<div>
					<p>预约门店</p>
					<p>{{orderInfo.hospName}}</p>
				</div>
				<div>
					<p>预约项目</p>
					<p>{{orderInfo.prjName}}</p>
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
			<div v-html="orderInfo.process"></div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>治疗结果</p>
			</div>
		</div>
		<div class="white">
			<div v-html="orderInfo.outcome"></div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>追踪术后信息</p>
			</div>
		</div>
		<div class="white">
			<div v-html="orderInfo.postInfo"></div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>术后注意事项</p>
			</div>
		</div>
		<div class="white">
			<div v-html="orderInfo.postNotes"></div>
		</div>
		<div class="tiShiInfo">
			注：分享成功可获得积分奖励哦！
		</div>
		<div class="QRCode">
			<div>
				<img :src="orderInfo.barcode"/>
			</div>
			<p>北京塑研医疗美容诊所</p>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div style="height: 5rem;"></div>
		<div class="botton">
			<button >分享订单</button>
			<!-- 分享后进入的页面 -->
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
		<!-- 待修改 分享订单后出现弹窗 -->
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast, Dialog } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
import TanChuang from '@/components/tanChuang';
export default {
	data() {
		return {
			ImgNull: this.$store.state.ImgNull,
			orderInfo: ''
		};
	},
	components: {
		TanChuang
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getVipPrjtOrderDetail({
			data: {
				openid: this.$store.state.uid,
				orderid: session.Lstorage.getItem('seeId')
			}
		}).then(res => {
			console.log(res);
			if (res.data.flag) {
				console.log('我的预约订单详情', res.data);
				this.orderInfo = res.data.order;
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

<style lang="scss" scoped>
@import '@/assets/css/mineReserveCheck.scss';
</style>
