<!-- 充值 -->
<template>
	<div class="all">
		<div class="top">
			<div class="top-con">
				<p>总金额（元）</p>
			</div>
			<p>{{info.cashBal}}</p>
		</div>
		<div class="list">
			<p>请选择充值金额</p>
			<div class="allList">
				<p v-for="(item,key,index) in listChargeInfo" :key='key' :class="bankInfo==item.bank?'colorA':''" @click="selectBank(item.bank)">{{item.bank}}元</p>
			</div>
		</div>
		<div class="recharge">
			<div class="recharge-title">
				<p>充值规则</p>
			</div>
			<div class="textarea" v-html="info.chargeRule"></div>
		</div>
		<div class="button" @click="submit">
			<button>确定充值</button>
		</div>
		<!-- 充值成功 -->
		<Tan-Chuang v-if="ifbank">
			<div class="slotImg">
				<img src="@/assets/images/icon/success.png" />
			</div>
			<p class="slotP">恭喜你，充值成功</p>
			<div class="slotDiv">
				<p>获得1000积分商城支付可抵扣</p>
			</div>
		</Tan-Chuang>
		<!-- 充值成功 END-->
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import { Toast } from 'we-vue';
import * as session from '@/assets/js/session';
import TanChuang from '@/components/tanChuang';
export default {
	name: 'Recharge',
	data() {
		return {
			info: '',
			listChargeInfo: '',
			bankInfo: 0,
			ifbank: false
		};
	},
	components: {
		TanChuang
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goVipChargeList({
			data: {
				openid: this.globalData.openid
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('充值页面', res.data);
				this.info = res.data; //余额和富文本
				this.listChargeInfo = res.data.listCharge; //充值金额
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		submit: function() {
			// 提交充值请求
			if (this.bankInfo == 0) {
				Toast.text({
					duration: 1000,
					message: '请选择充值金额'
				});
				return;
			}
			api.submitCharge({
				data: {
					openid: this.globalData.openid,
					money: this.bankInfo
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('充值', res.data);
					// 待修改  数据请求失败
					this.ifbank = true;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},

		selectBank: function(res) {
			// 选择金额
			this.bankInfo = res;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Recharge.scss';
</style>
