<template>
	<div class="all">
		<div class="textarea">
			<div class="textarea-con">
				<div class="textarea-text" v-html="shareContent"></div>
			</div>
			<div style="height:calc(1.8rem/2);background: #f7f7f7;"></div>
			<div class="code">
				<div class="code-img">
					<!-- {{barcode}} -->
					<img src="../assets/images/icon/newQRcode.png" />
				</div>
				<p>点击右上角分享页面，分享给朋友。</p>
				<p>好友通过二维码注册成功后，您可获得积分奖励。</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import * as api from '@/assets/js/api';
	import {
		Toast
	} from 'we-vue';
	export default {
		data() {
			return {
				doctorImgNull: this.$store.state.doctorImgNull,
				barcode: '',
				shareContent: ''
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getVipShare({
				data: {
					shareOpenid: this.globalData.openid
				}
			}).then(res => {
				console.log(res.data);
				if (res.data.flag) {
					this.barcode = res.data.barcode;
					this.shareContent = res.data.shareContent;
				} else {
					Toast.text({
						duration: 1000,
						message: '请求失败'
					});
				}
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/newQRCode.scss';
</style>
