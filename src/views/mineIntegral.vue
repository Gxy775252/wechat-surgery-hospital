<!-- 我的积分 -->
<template>
	<div class="all">
		<div class="top">
			<div class="top-con">
				<p>总金额（元）</p>
				<div class="guize" @click="open">
					<p>积分规则</p>
					<div>
						<img src="../assets/images/icon/balance.png" />
					</div>
				</div>
			</div>
			<p>{{Info.scoreBal}}</p>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>积分记录</p>
			</div>
		</div>
		<div class="box">
			<div class="diaryList" v-for="(item,key,index) in listResultInfo" :key='key'>
				<p class="yearFont">{{item.date10}}</p>
				<div class="monthBox" v-for="(item2,key,index) in item.listChg" :key='key'>
					<div class="month">
						<div class="monthImg"><img src="@/assets/images/icon/level.jpg"></div>
						<p>{{item2.interestDate}}</p>
					</div>
					<div class="con">
						<p>{{item2.type}}</p>
						<p>{{item2.score}}</p>
					</div>
				</div>
			</div>
		</div>
		<div style="height: 3rem;"></div>
		<div class="buttonA">
			<button @click="give">送积分</button>
		</div>
		<!-- 积分规则 -->
		<div class="model" v-if="ifOpen">
			<div class="modelText">
				<p>- 积分规则 -</p>
				<div class="modelCon" v-html='Info.scoreRule'></div>
				<div class="success">
					<button @click="succA">确定</button>
				</div>
			</div>
		</div>
		<!-- 积分规则 END-->
		<!-- 送积分 -->
		<div class="model" v-if="ifGive">
			<div class="jifen">
				<p>- 送积分 -</p>
				<p>请输入要送出的积分数值（输入整数）</p>
				<div class="inputA">
					<input placeholder="请输入送出的积分数值" type="number" ref='inputA'/>
				</div>
				<div class="success" style="margin-top:45px;">
					<button @click="submit">确定</button>
				</div>
				<div class="close">
					<img src="../assets/images/icon/guanbi.png" />
				</div>
			</div>
		</div>
		<!-- 送积分 END-->
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import { Toast } from 'we-vue';
import * as session from '@/assets/js/session';
export default {
	name: 'mineIntegral',
	data() {
		return {
			listResultInfo: '',
			Info: '',
			ifOpen: false,
			ifGive: false
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.goVipScore({
			data: {
				openid: this.globalData.openid
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('我的积分', res.data);
				this.listResultInfo = res.data.listResult; //充值列表
				this.Info = res.data; //总金额和收益规则
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		submit: function() {
			// 输入积分
			let num = /^[1-9]\d*$/;
			if (!num.test(this.$refs.inputA.value)) {
				Toast.text({
					duration: 1000,
					message: '请输入有效的整数'
				});
				return;
			}
			// 待修改 赠送积分后弹出 6位密码
			// 待修改 生成积分赠送记录接口 和 使赠送记录生效 接口 不清楚
// 			api.genScoreGift({
// 				data: {
// 					openid: this.globalData.openid,
// 					password: 123,
// 					score: this.$refs.inputA.value
// 				}
// 			}).then(res => {
// 				if (res.data.flag) {
// 					console.log('赠送积分成功', res.data);
// 					Toast.text({
// 						duration: 1000,
// 						message: '赠送成功'
// 					});
// 					api.getVipScoreBal({
// 						data: {
// 							openid: this.globalData.openid
// 						}
// 					}).then(res => {
// 						if (res.data.flag) {
// 							console.log('积分余额', res.data);
// 							this.Info.scoreBal = res.data.scoreBal;
// 						} else {
// 							Toast.text({
// 								duration: 1000,
// 								message: res.data.msg
// 							});
// 						}
// 					});
// 				} else {
// 					Toast.text({
// 						duration: 1000,
// 						message: res.data.msg
// 					});
// 				}
// 			});
		},

		open: function() {
			// 打开积分规则
			if (this.ifOpen) {
				this.ifOpen = false;
			} else {
				this.ifOpen = true;
			}
		},

		give: function() {
			// 送积分
			this.ifGive = true;
		},

		succA: function() {
			// 关闭积分规则
			this.ifOpen = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineIntegral.scss';
</style>
