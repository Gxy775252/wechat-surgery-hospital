<template>
	<div class="all">
		<div class="navList">
			<div @click="whole" :class="backId == 0 ? 'col_00' : 'col_ff' ">
				<p>全部</p>
				<p></p>
			</div>
			<div @click="unfinished" :class="backId == 1 ? 'col_00' : 'col_ff' ">
				<p>未完成</p>
				<p></p>
			</div>
			<div @click="onOver" :class="backId == 2 ? 'col_00' : 'col_ff' ">
				<p>已完成</p>
				<p></p>
			</div>
		</div>
		<div class="conList" v-for="(item,key,index) in listOrderinfo" :key="key" @click="goOrderdetails(item.id)">
			<div class="name">
				<div class="name-left">
					<p>用户<span></span></p>
					<p>{{item.name}}</p>
				</div>
				<div class="name-right" v-if="item.status == 1">未完成</div>
				<div class="name-right" v-if="item.status == 2">已完成</div>
			</div>
			<div class="top">
				<div>
					<p>预约时间</p>
					<p>{{item.date}} {{item.period}}</p>
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
					<p>预约医生</p>
					<p>{{item.doctorName}}</p>
				</div>
			</div>
		</div>
		<div v-if="listOrderinfo.length==0" class="cartNull">
			<img src="../assets/images/icon/cartNull.png" />
			<p>暂无信息</p>
		</div>
	</div>


</template>

<script>
	import {
		Toast
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	export default {
		data() {
			return {
				listOrderinfo: [],
				backId: 0,
				ImgNull: this.$store.state.ImgNull
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getDoctorOrderList({
				data: {
					openid: this.$store.state.uid,
					status: 0
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('医生订单详情', res.data);
					(this.listOrderinfo = res.data.listOrder), (this.backId = 0);
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			//跳转订单详情
			goOrderdetails: function(res) {
				session.Lstorage.setItem('id', res);
				this.$router.push({
					name: 'stationingDoctorOrderDetail'
				});
			},
			//点击全部订单
			whole: function() {
				api.getDoctorOrderList({
					data: {
						openid: this.$store.state.uid,
						status: 0
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('医生订单全部', res.data);
						(this.listOrderinfo = res.data.listOrder), (this.backId = 0);
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			},
			//点击未核销订单
			unfinished: function() {
				api.getDoctorOrderList({
					data: {
						openid: this.$store.state.uid,
						status: 1
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('医生订单未核销', res.data);
						(this.listOrderinfo = res.data.listOrder), (this.backId = 1);
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			},
			onOver: function() {
				api.getDoctorOrderList({
					data: {
						openid: this.$store.state.uid,
						status: 2
					}
				}).then(res => {
					if (res.data.flag) {
						console.log('医生订单已核销', res.data);
						(this.listOrderinfo = res.data.listOrder), (this.backId = 2);
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/stationingDoctorOrder.scss';
</style>
