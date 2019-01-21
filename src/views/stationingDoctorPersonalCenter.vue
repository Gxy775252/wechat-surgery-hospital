<!-- 驻场医生个人中心 -->
<template>
	<div class="all">
		<div class="head">
			<div class="headImg">
				<img :src="doctorInfo.headimg || ImgNull" />
			</div>
			<p>{{doctorInfo.name}}</p>
		</div>
		<div class="list" style="margin-top:calc(4rem/2)" @click='appointment'>
			<p>预约订单</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
		<div class="list" @click="goCustomer">
			<p>我的客户</p>
			<div>
				<img src="../assets/images/icon/mineHore.png" />
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'stationingDoctorPersonalCenter',
	data() {
		return {
			doctorInfo: '',
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getDoctorDetailSettled({
			data: {
				openid: this.$store.state.uid
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('医生个人中心', res.data);
				this.doctorInfo = res.data.doctor;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		goCustomer: function() {
			this.$router.push({ name: 'stationingMyUser' });
		},
		appointment: function() {
			this.$router.push({ name: 'stationingDoctorOrder' });
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/stationingDoctorPersonalCenter.scss';
</style>
