<template>
	<div>
		<div class="box">
			<div class="srarsFont">
				滑动星星进行总体评价
			</div>
			<div class="srarsBoxA">
				<Five-Srars @starsNumA="starsNumA" :size="4.4" :id='0' :marginRight="2.06"></Five-Srars>
			</div>
		</div>
		<div class="line"></div>
		<div class="boxB">
			<div class="srarsLine" v-for='(item,key,index) in listDetailInfo' :key='key'>
				<div class="srarsFiveS">{{item.detail}}</div>
				<Five-Srars :size="3.2" :marginRight="2.06" @starsNumA="starsNumB" :id="item.id"></Five-Srars>
			</div>
		</div>
		<div class="line"></div>
		<div class='text'>
			<wv-textarea placeholder="满足你的期待吗？说说优点和美中不足的地方吧" :rows="4" v-model='textCon'></wv-textarea>
		</div>
		<div class="buttonA" @click="submit">
			<button>提交</button>
		</div>
		<!-- 充值成功 -->
		<Tan-Chuang v-if="ifbank" @HideTanChuang="clickDetermine" :data="this.$options.name">
			<div class="slotImg">
				<img src="@/assets/images/icon/lihe.png" />
			</div>
			<p class="slotP">恭喜你，成功提交</p>
			<div class="slotDiv">
				<p>获得积分商城支付可抵扣</p>
			</div>
		</Tan-Chuang>
		<!-- 充值成功 END-->
	</div>
</template>

<script>
	import Vue from 'vue';
	import FiveSrars from '@/components/fiveStars.vue';
	import {
		Toast,
		Textarea
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	import TanChuang from '@/components/tanChuang';
	Vue.use(Textarea)
	export default {
		data() {
			return {
				textCon: '',
				listDetailInfo: '',
				numberBox: [],
				stars: '',
				ifbank: false
			};
		},
		components: {
			'Five-Srars': FiveSrars,
			TanChuang
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.goModelSurvey({
				data: {
					openid: this.$store.state.uid,
					orderid: this.$route.query.orderId,
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('满意度', res.data);
					// 待修改内容
					this.listDetailInfo = res.data.listDetail;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			starsNumA: function(e) {
				console.log(e);
				this.stars = e.index;
			},
			starsNumB: function(e) {
				var data = {
					'detailid': e.id,
					'stars': e.index
				};
				if (this.numberBox.length == 0) {
					this.numberBox.push(data);
				} else {
					for (var i = 0; i < this.numberBox.length; i++) {
						if (this.numberBox[i].detailid == e.id) {
							this.numberBox[i].stars = e.index;
							return;
						}
					}
					this.numberBox.push(data);
				}
			},
			submit: function() {
				// 提交
				if (this.listDetailInfo.length != this.numberBox.length || this.stars == '') {
					Toast.text({
						duration: 1000,
						message: '请打分'
					});
					return;
				}
				api.submitSurvey({
					data: {
						openid: this.$store.state.uid,
						stars: this.stars,
						detailList: JSON.stringify(this.numberBox),
						orderid: this.$route.query.orderid || 1, //带修改
					}
				}).then(res => {
					console.log('全部收益', res.data);
					if (res.data.flag) {
						this.ifbank = true;
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			},
			clickDetermine: function() {
				this.ifbank = false
			},
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		padding: calc(6rem/2) calc(2.53rem/2);
	}

	.srarsFont {
		color: #333;
		font-size: calc(1.6rem/2);
	}

	.srarsBoxA {
		margin-top: calc(1.6rem/2);
	}

	.line {
		height: calc(0.13rem/2);
		width: 100%;
		background-color: #f7f7f7;
	}

	.boxB {
		margin: calc(4.53rem/2) calc(2.53rem/2);
	}

	.srarsLine {
		display: flex;
		margin-bottom: calc(2.53rem/2);
	}

	.srarsFiveS {
		margin-right: calc(4rem/2);
		color: #333;
		font-size: calc(1.6rem/2);
		line-height: calc(3.2rem/2);
	}

	.text {
		margin: auto;
		height: 200px;
		width: 98%;
		margin-top: 10px;
	}

	.buttonA {
		width: 100%;
		height: calc(6.26rem / 2);
		position: fixed;
		bottom: 0;
		left: 0;

		>button {
			width: 100%;
			height: 100%;
			font-size: calc(1.8rem / 2);
			background: #008e83;
			color: #fff;
		}
	}

	.slotImg {
		width: calc(10.6rem / 2);
		height: calc(10.73rem / 2);
		margin: 1.5rem auto;

		>img {
			width: 100%;
			height: 100%;
		}
	}

	.slotP {
		width: 100%;
		text-align: center;
		font-size: calc(2.13rem / 2);
		color: #333;
	}

	.slotDiv {
		color: #008a7e;
		font-size: calc(1.46rem / 2);

		>p {
			text-align: center;
		}
	}
</style>
