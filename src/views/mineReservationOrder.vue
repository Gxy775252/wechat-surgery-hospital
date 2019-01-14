<template>
	<div class="all">
		<div class="navList">
			<div v-for="item,index in titleContent" @click="titleName(index)">
				<p>{{item.name}}</p>
				<p v-if="item.select" class="lineP"></p>
			</div>
		</div>
		<div class="conList" v-for="item in listOrder">
			<div class="top">
				<!-- =0全部 =1已支付未核销 =2已核销 =-1已取消 -->
				<p class="hexiao" v-if="item.status==-1">已取消</p>
				<p class="hexiao" v-if="item.status==1">未核销</p>
				<p class="hexiao" v-if="item.status==2">已核销</p>
				<div>
					<p>预约时间</p>
					<p>{{item.updateTime}}</p>
				</div>
				<div>
					<p>预约门店</p>
					<p>{{item.postAddress}}</p>
				</div>
				<div>
					<p>预约项目</p>
					<p>{{item.projectName}}</p>
				</div>
				<div>
					<p>预约医生</p>
					<p>{{item.doctorName}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-left">
					<p>已付金额：</p>
					<p>￥{{item.payMoney}}</p>
				</div>
				<div class="bottom-right">
					<button class="color" @click="mineReserveSuccess(item.id)">查看二维码</button>
					<button class="color">去核销</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {Toast} from 'we-vue';
	import * as api from '@/assets/js/api';
	export default {
		data() {
			return {
				titleContent:[
					{name:'全部',select:true},
					{name:'未核销',select:false},
					{name:'已核销',select:false}],
					listOrder:[]
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			this.dataContent(0);
			
		},
		methods:{
			titleName:function(index){
				this.titleContent.map(item=>{item.select=false;});
				this.titleContent[index].select=true;
			},
			mineReserveSuccess:function(id){
				console.log(id);
				this.$router.push({
					name:'mineReserveSuccess',
					params:{
						orderid:id
					}
				})
			},
			dataContent:function(e){
				api.getVipGoodsOrderList({
					data:{
						openid:this.globalData.openid,
						status:e
					}
				}).then(res=>{
					console.log(res);
					if (res.data.flag) {
						console.log(res.data);
						this.listOrder=res.data.listOrder
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineReservationOrder.scss';
</style>
