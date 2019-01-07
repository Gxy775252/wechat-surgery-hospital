<template>
	<div class="all">
		<div class="textarea">
			<div class="textarea-con">
				<div class="img">
					<img src="../assets/images/example/doctor.png"/>
				</div>
				<div class="textarea-text">
					<p class="title">医学美容/Aesthetic Medicine</p>
					<p class="content">
						是引用雨雪以及相关的手段达到美容的目的，是医学多学科内发展想管美容成分的一种结合，隶属于社会应用体系学科。他的诞生应该是在人类有医学出现指出，就可能有映雪医学手段达到美容的目的，广义而言，不仅仅是包换雨雪。
					</p>
				</div>
			</div>
			<div style="height:calc(1.8rem/2);background: #f7f7f7;"></div>
			<div class="code">
				<div class="code-img">
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
	export default {
		data() {
			return {
				doctorImgNull: this.$store.state.doctorImgNull,
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import '@/assets/css/newQRCode.scss';
</style>
