<!-- 我的余额 -->
<template>
	<div class="all">
		<!-- <div class="topText">
			<div>
				<img src="../assets/images/icon/tishi.png" />
			</div>
			<p>12月24日-1月1日式活动期间，充值100000年利率为6%，</p>
		</div> -->
		<div class="top">
			<div class="top-con">
				<p>总金额（元）</p>
				<div class="guize" @click="open">
					<p>收益规则</p>
					<div>
						<img src="../assets/images/icon/balance.png" />
					</div>
				</div>
			</div>
			<p>{{Info.cashBal}}</p>
		</div>
		<div class="NavList">
			<div :class="classId==1?'clickColor':''" @click="selectClick(1)">
				<p>充值收益记录</p>
				<p></p>
			</div>
			<div :class="classId==2?'clickColor':''" @click="selectClick(2)">
				<p>余额消费记录</p>
				<p></p>
			</div>
		</div>
		<div class="box" v-if="classId==2">
			<div class="diaryList" v-for="(item,key,index) in listConsumeInfo" :key='key'>
				<p class="yearFont">{{item.date10}}年</p>
				<div class="monthBox" v-for="(item2,key,index) in item.listChg" :key='key'>
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>{{item2.createTime}}</p>
					</div>
					<div class="con">
						<p>{{item2.type}}</p>
						<p>{{item2.cash}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="boxList" v-if="classId==1">
			<div class="boxList-list" v-for="(item,key,index) in listChargeInfo" :key='key'>
				<div>
					<p class="price">充值{{item.cash}}</p>
					<p class="time">{{item.createTime}}</p>
				</div>
				<div class="balance">
					<div>
						<p>年花利率{{item.rate | toPercent}}</p>
						<p>截至日期{{item.startDate}}-{{item.endDate}}</p>
					</div>
					<div class="balance-con" @click="goAllProfit(item.id,item.cash,item.rate,item.createTime,item.startDate,item.endDate)">
						<p>全部收益</p>
						<div>
							<img src="../assets/images/icon/rightColor.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 6rem;"></div>
		<div class="buttonA" @click="goRecharge">
			<button>充值</button>
		</div>
		<!-- 收益规则 -->
		<div class="model" v-if="openGuiZe">
			<div class="modelText">
				<p>- 收益规则 -</p>
				<div class="modelCon" v-html='Info.earningRule'></div>
				<div class="success">
					<button @click="open">确定</button>
				</div>
			</div>
		</div>
		<!-- 收益规则 END-->
	</div>
</template>
<script>
import * as api from '@/assets/js/api';
import { Toast } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'mineBalance',
	data() {
		return {
			classId: 2, //选中id
			openGuiZe: false, //收益规则
			Info: '',
			listChargeInfo: '',
			listConsumeInfo: ''
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goVipBalance({
			data: {
				openid: this.$store.state.uid
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('我的余额', res.data);
				this.listConsumeInfo = res.data.listConsume; //消费记录
				this.listChargeInfo = res.data.listCharge; //充值列表
				this.Info = res.data; //总金额和收益规则
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		goAllProfit: function(id, cash, rate, createTime, startDate, endDate) {
			console.log(id, cash, rate, createTime, startDate, endDate);
			// 跳全部收益
			session.Lstorage.setItem('chargeId', id);
			session.Lstorage.setItem('cashB', cash);
			session.Lstorage.setItem('rateB', rate);
			session.Lstorage.setItem('createTimeB', createTime);
			session.Lstorage.setItem('startDateB', startDate);
			session.Lstorage.setItem('endDateB', endDate);
			this.$router.push({
				name: 'allProfit'
			});
		},
		goRecharge: function() {
			// 跳充值页面
			this.$router.push({
				name: 'Recharge'
			});
		},
		selectClick: function(res) {
			// 切换内容
			this.classId = res;
		},
		open: function() {
			// 打开收益规格
			if (this.openGuiZe) {
				this.openGuiZe = false;
			} else {
				this.openGuiZe = true;
			}
		}
	},
	filters: {
		toPercent: function(res) {
			if (res == 0) {
				return 0;
			}
			var str = Number(res * 100).toFixed();
			str += '%';
			return str;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineBalance.scss';
</style>
