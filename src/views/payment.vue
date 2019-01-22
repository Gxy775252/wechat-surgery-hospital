<template>
	<div class="all">
		<div class="content">
			<img src="../assets/images/icon/zhifu.png" />
		</div>
	</div>
</template>

<script>
	import * as api from '@/assets/js/api';
	import wx from 'weixin-js-sdk'
	
	import {
		Toast
	} from 'we-vue';
	export default {
		data() {
			return {};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
		},
		mounted: function(){
			if (typeof WeixinJSBridge == "undefined") { // 判断是否在微信浏览器内
			    if (document.addEventListener) {
			        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			    } else if (document.attachEvent) {
			        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
			        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			    }
			} else {
				gotoPay()
			}
			function gotoPay(){
				api.getWechatPay({
					data: {
						openid: this.$store.state.uid || 'oYi8Av6WZm8rscL77fxDV8xWkBv0',
						prepay_id: this.$router.query.payId
					}
				}).then(res => {
					console.log(res,'-------------res pay')
				})
			}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/payment.scss';
</style>
