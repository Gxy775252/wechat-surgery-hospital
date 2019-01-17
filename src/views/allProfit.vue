<!-- 全部收益 -->
<template>
	<div class="all">
		<div class="top">
			<p>{{createTime}}充值{{cash}}元</p>
			<p>年化利率{{rate | toPercent}} &nbsp;&nbsp;&nbsp;&nbsp;截至日期{{startDate}}-{{endDate}}</p>
		</div>
		<div class="dayList" v-for="(item,key,index) in listInterest" :key='key'>
			<div class="dayList-date">{{item.interestDate}}</div>
			<div class="dayList-num">+{{item.score}}</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import { Toast } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'allProfit',
	data() {
		return {
			listInterest: [],
			cash: '',
			rate: '',
			createTime: '',
			startDate: '',
			endDate: ''
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getChargeInterestList({
			data: {
				openid: this.$store.state.uid,
				chargeid: session.Lstorage.getItem('chargeId')
			}
		}).then(res => {
			console.log('全部收益', res.data);
			this.cash = session.Lstorage.getItem('cashB');
			this.rate = session.Lstorage.getItem('rateB');
			this.createTime = session.Lstorage.getItem('createTimeB');
			this.startDate = session.Lstorage.getItem('startDateB');
			this.endDate = session.Lstorage.getItem('endDateB');
			if (res.data.flag) {
				this.listInterest = res.data.listInterest;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
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
@import '@/assets/css/allProfit.scss';
</style>
