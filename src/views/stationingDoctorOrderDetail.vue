<template>
	<div class="all">
		<div class="top2">
			<p v-if="orderInfo.status == 2">已完成</p>
			<p v-if="orderInfo.status == 1">未核销</p>
			<p>{{orderInfo.memo}}</p>
		</div>
		<div class="doctorName">
			<div class="doctorNameTop">
				<div class="topImgA">
					<img :src="doctorImgNull" />
				</div>
				<div class="doctorNameBottom">
					<div>
						<p>预约时间</p>
						<p>{{orderInfo.date}}</p>
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
		</div>
		<div class="seeBingLi">
			<div class="seeBingLi-left" @click="goVieaCases">
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
				{{orderInfo.process}}
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
				{{orderInfo.outcome}}
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
				{{orderInfo.postInfo}}
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	export default {
		data() {
			return {
				doctorImgNull: this.$store.state.doctorImgNull,
				ImgNull: this.$store.state.ImgNull,
				orderInfo:''
			};
		},
		created: function() {
			
			var id = this.$route.params.id;
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getDoctorOrderDetail({
				data: {
					openid: this.globalData.openid,
					id:id
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('医生订单详情', res.data);
					this.orderInfo = res.data.order
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods:{
			goVieaCases:function(){
				this.$router.push({ name: 'stationingDoctorOrder'});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/stationingDoctorOrderDetail.scss';
	@import '@/assets/css/mineReserveCheck.scss';
</style>
