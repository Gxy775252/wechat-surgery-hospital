<template>
	<div class="all">
		<div class="top2" v-if="!ifSuccess">
			<p>支付成功</p>
			<p>线下出示二维码进行核销</p>
		</div>
		<div class="top" v-if="ifSuccess">
			<p>核销成功</p>
			<p>二维码线下核销成功</p>
		</div>
		<div class="code">
			<div class="code-img">
				<img :src="orderInfo.barcode||ImgNull" />
			</div>
		</div>
		<div class="conList">
			<div class="top">
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
				<div>
					<p>预约医生</p>
					<p>{{orderInfo.doctorName}}</p>
				</div>
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div class="bottom">
			<button @click="model">取消预约</button>
		</div>
		<!-- 取消预约 -->
		<div class="model" v-if="ifModel">
			<div class="modelwhite">
				<div class="modelimg">
					<img src="../assets/images/icon/quxiao.png" />
				</div>
				<p class="title">您确定要取消预约吗？</p>
				<p class="brief">提前一天取消预约可退款，当天不可退款</p>
				<div class="phone">
					<p>如有疑问，请联系客服</p>
					<p>400-10203948</p>
				</div>
				<div class="buttonA">
					<button style="color:#666" @click="close">再考虑考虑</button>
					<button style="color: #008e83;border-left:2px solid #fafafa;" @click="cancel">确定</button>
				</div>
			</div>
		</div>
		<!-- 取消预约 END-->
	</div>
</template>

<script>
import Vue from 'vue';
import { Toast, Dialog } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	data() {
		return {
			ifSuccess: false,
			ifModel: false,
			orderInfo: '',
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getVipPrjtOrderDetail({
			data: {
				openid: this.$store.state.uid,
				orderid: session.Lstorage.getItem('successId')
			}
		}).then(res => {
			console.log(res);
			if (res.data.flag) {
				console.log('核销预约订单', res.data);
				this.orderInfo = res.data.order;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		cancel: function(res) {
			api.cancelPrjtOrder({
				data: {
					openid: this.$store.state.uid,
					orderid: session.Lstorage.getItem('successId')
				}
			}).then(res => {
				console.log('是否取消了----', res);
				if (res.data.flag) {
					Toast.text({
						duration: 1000,
						message: '取消成功'
					});
					this.ifSuccess = true;
					// 待修改 核销成功后替换内容
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		model: function() {
			this.ifModel = true; //显示取消框
		},
		close: function() {
			this.ifModel = false; //关闭取消框
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineReserveSuccess.scss';
</style>
