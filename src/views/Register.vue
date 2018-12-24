<template>
	<div class="background" id="background">
		<div style="height: 3.33rem;"></div>
		<div class="logo">
			<div class="surgery">
				<img src="@/assets/images/icon/zhucelogo.png" />
			</div>
			<div class="close">
				<img src="@/assets/images/icon/guanbi.png" />
			</div>
		</div>
		<div class="message">
			<div class="phone" style="padding-top:calc(6rem /2);">
				<p>Phone number</p>
				<div>
					<input maxlength="11"/>
					<p>点击发送验证码</p>
				</div>
			</div>
			<div class="phone" style="padding:calc(6rem /2) 0;">
				<p>Verification Code</p>
				<div>
					<input maxlength="6"/>
					<!-- <p>点击发送验证码</p> -->
				</div>
			</div>
			<div class="primary"> 
				<button type="button">注册</button>
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<Tan-Chuang>
			<div class="slotImg">
				<img src="@/assets/images/icon/lihe.png" />
			</div>
			<p class="slotP">恭喜你，注册成功</p>
			<div class="slotDiv">
				<p>获得1000积分</p>
				<p>商城支付可抵扣</p>
			</div>
		</Tan-Chuang>
	</div>
</template>
<script type="text/javascript">
import TanChuang from '@/components/tanChuang';
import Vue from 'vue';
import { Button } from 'we-vue';
import { Authorization, parseUrl } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
Vue.use(Button);
export default {
    name: 'background',
    components: {
        TanChuang
    },
    created: function() {
        // function aaa(){
        //   console.log('222')
        // }
    },
    mounted: function() {}
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/register.scss';
</style>
