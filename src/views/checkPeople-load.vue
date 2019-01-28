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
				<button type="button" @click="submit">激活</button>
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
	</div>
</template>

<script>
	import TanChuang from '@/components/tanChuang';
	import Vue from 'vue';
	import {
		Button,
		Toast
	} from 'we-vue';
	import {
		Authorization,
		parseUrl,
		showBottomNav
	} from '@/assets/js/utils';
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
		},
		methods: {
			getCode: function() {
				let isPhone = /^1(3|4|5|7|8)\d{9}$/;
				let {
					value
				} = this.$refs.phone;
				if (!isPhone.test(value)) {
					Toast.text({
						duration: 1000,
						message: '请输入正确格式的手机号'
					});
					return;
				}
				api.getAndSendSms({
					data: {
						phone: value,
						openid: this.$store.state.uid
					}
				}).then(res => {
					const code = res.data.code;
					if (res.data.flag) {
						this.code = code || '112233';
						Toast.text({
							duration: 1000,
							message: '已发送'
						});
						this.setTime(this.count);
					} else {
						Toast.text({
							duration: 1000,
							message: '发送失败'
						});
					}
				});
			},
			submit: function() {
				let isPhone = /^1(3|4|5|7|8)\d{9}$/;
				let {
					code,
					phone
				} = this.$refs;
				if (!isPhone.test(phone.value)) {
					Toast.text({
						duration: 1000,
						message: '请输入正确格式的手机号'
					});
					return;
				}
				if (code.value != this.code) {
					Toast.text({
						duration: 1000,
						message: '验证码不正确'
					});
					return;
				}
				api.registerDoctor({
					data: {
						openid: this.$store.state.uid,
						phone: phone.value,
						validcode: code.value
					}
				}).then(res => {
					if (res.data.flag) {
						this.$router.push({
							name: 'stationingDoctorPersonalCenter'
						});
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			},
			setTime: function(num) {
				let run = setInterval(() => {
					num--;
					if (num == 0) {
						this.codeText = '点击发送验证码';
						this.getCodeIsClick = true;
						clearInterval(run);
					} else {
						this.codeText = `${num}s`;
						this.getCodeIsClick = false;
					}
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/activation.scss';
</style>
