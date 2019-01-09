<template>
	<div class="background" id="background">
		<div style="height: 3.33rem;"></div>
		<div class="logo">
			<div class="surgery">
				<img src="@/assets/images/icon/logo.png" />
			</div>
		</div>
		<div class="message">
			<div class="phone" style="padding-top:calc(6rem /2);">
				<p>Phone number</p>
				<div>
					<input ref="phone" maxlength="11" value="" />
					<p>{{codeText}}</p>
				</div>
			</div>
			<div class="phone" style="padding:calc(6rem /2) 0;">
				<p>Verification Code</p>
				<div>
					<input ref="code" maxlength="6" value="" />
				</div>
			</div>
			<div class="primary">
				<button type="button">激活</button>
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
<!-- 		<Tan-Chuang>
			<div class="slotImg">
				<img src="@/assets/images/icon/lihe.png" />
			</div>
			<p class="slotP">恭喜你，注册成功</p>
			<div class="slotDiv">
				<p>获得1000积分商城支付可抵扣</p>
			</div>
		</Tan-Chuang> -->
	</div>
</template>

<script>
import TanChuang from '@/components/tanChuang';
import Vue from 'vue';
import { Button, Toast } from 'we-vue';
import { Authorization, parseUrl, showBottomNav } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
Vue.use(Button);
export default {
	name: 'activation',
	data() {
		return {
			count: 60,
			codeText: '点击发送验证码',
			successReg: false
		};
	},
	components: {
		TanChuang
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/activation.scss';
</style>
