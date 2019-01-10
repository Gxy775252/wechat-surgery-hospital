<template>
	<div class="all">
		<div class="top">
			<p>2018年12月12日充值100000元</p>
			<p>年化利率6.00% &nbsp;&nbsp;&nbsp;&nbsp;截至日期2018/12/12-2019/12/12</p>
		</div>
		<div class="dayList" v-for="item in listInterest">
			<div class="dayList-date">{{item.interestDate}}</div>
			<div class="dayList-num">+{{item.score}}</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import * as api from '@/assets/js/api';
	import {Toast } from 'we-vue';
	export default {
		data() {
			return {
				listInterest:[]
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getChargeInterestList({
				data:{
					openid: this.globalData.openid,
					chargeid:1 //待修改，不清楚是干啥的
				}
			}).then(res=>{
				console.log(res)
				if (res.data.flag) {
					this.listInterest=res.data.listInterest
				}else{
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			})
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/allProfit.scss';
</style>
