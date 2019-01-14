<template>
	<div class="all"> 
		<div class="lists"  v-for="(item,key,index) in orderInfo" :key="key">
			<div class="lists-left">
				<div class="img">
					<img src="../assets/images/icon/sele.png" />
				</div>
			</div>
			<div class="lists-right" >
				<div class="conList">
					<div class="name">
						<div class="name-left">
							<p>用户<span></span></p>
							<p>{{item.name}}</p>
						</div>
					</div>
					<div class="top">
						<div>
							<p>预约时间</p>
							<p>{{item.date}}</p>
						</div>
						<div>
							<p>预约门店</p>
							<p>{{item.hospName}}</p>
						</div>
						<div>
							<p>预约项目</p>
							<p>{{item.prjName}}</p>
						</div>
						<div>
							<p>预约金额</p>
							<p>{{item.payMoney}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!-- <template>
	<div class="all">
		<div class="lists">
			<div class="lists-left">
				<div class="img">
					<img src="../assets/images/icon/sele.png" />
				</div>
			</div>
			<div class="lists-right">
				<div class="conList">
					<div class="name">
						<div class="name-left">
							<p>用户<span></span></p>
							<p>用户姓名</p>
						</div>
					</div>
					<div class="top">
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
						<div>
							<p>预约医生</p>
							<p>哈哈哈</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
 -->
<script>
	import {
		Toast
	} from 'we-vue';
	import * as api from '@/assets/js/api';
export default {
	data() {
		return {
			orderInfo:[],
			vipinfo:''
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getVipOrderList({
			data: {
				openid: this.globalData.openid,
				vipid:1
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生订单详情', res.data);
				this.orderInfo = res.data.listOrder
				this.vipinfo = res.data.vip
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
@import '@/assets/css/stationingUploads.scss';
</style>
