<template>
	<div class="all">
		<div class="newList-list"  v-for="(item,key,index) in userinfo" :key="key">
			<div class="head">
				<div class="headimg">
					<img :src="item.headimg" />
				</div>
				<div class="headText">
					<p>{{item.name}}</p>
					<p>{{item.prjtList}}</p>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-left">
					<p></p>
					<p></p>
				</div>
				<div class="bottom-right">
					<button class="colorB" @click="onSeeDay(item.vipid)">查看美丽日记</button>
					<button class="colorA" @click="upSeeDay">上传美丽日记</button>
				</div>
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
				userinfo:'',
				ImgNull: this.$store.state.ImgNull,
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getDoctorVipList({
				data: {
					openid: this.globalData.openid,
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('医生用户列表', res.data);
					this.userinfo = res.data.listVip
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods:{
			onSeeDay:function(res){
				this.$router.push({ name: 'seeBeautyDiary', params: { id: res }});
			},
			upSeeDay:function(){
				this.$router.push({ name: 'stationingUpload'});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/stationingMyUser.scss';
</style>
