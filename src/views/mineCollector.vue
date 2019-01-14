<template>
	<div class="all">
		<div class="listAll">
			<div class="insList">
				<div class="insImg">
					<img :src="doctorImgNull" />
				</div>
				<div class="insInfo">
					<p>活力你那加的夫</p>
					<p>欢子u卓越的医疗美容仪器顶尖医学专家</p>
				</div>
				<div class="inspirce">
					<p>￥ 99</p>
					<div @click="shoucang(heart)">
						<img :src="heart" />
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
</template>
<!-- <template>
	<div class="all">
		<div class="listAll">
			<div class="insList" v-for="item in content">
				<div class="insImg" @click="videoPlay(item.url)">
					<img :src="item.cover || doctorImgNull" class="imgA"/>
					<div v-if="item.isVideo==1" class="playImg">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
				<div class="insInfo">
					<p>{{item.goodsName}}</p>
					<p>{{item.goodsBrief}}</p>
				</div>
				<div class="inspirce">
					<p>￥{{item.goodsPrice}}</p>
					<div @click="shoucang(heart)">
						<img :src="heart" />
					</div>
					<div class="briefImg" v-if="isPlay">
						<Video-Play :videoUrl="videoUrl" v-on:surt="surtChild" :isNone="isPlay"></Video-Play>
					</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
	</div>
</template> -->
<script>
	import VideoPlay from '@/components/bigWindowVideo';
	import * as api from '@/assets/js/api';
	import {
		Toast
	} from 'we-vue';
	export default {
		components: {
			VideoPlay
		},
		data() {
			return {
				doctorImgNull: this.$store.state.doctorImgNull,
				isPlay: false,
				content: [],
				heart: require('../assets/images/icon/shoucang.png') //待修改，没有判断是否取消收藏的按钮，自定义一个，待修改
			};
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getVipFavorList({
				data: {
					openid: this.globalData.openid
				}
			}).then(res => {
				console.log('我的收藏', res.data);
				if (res.data.flag) {
					this.content = res.data.listFavor
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			})
		},
		methods: {
			shoucang: function() {
				if (this.heart == require('../assets/images/icon/shoucang.png')) {
					this.heart = require('../assets/images/icon/shoucang-k.png');
					api.unfavor({
						data: {
							openid: this.globalData.openid
						}
					}).then(res => {
						console.log('取消收藏', res.data);
						if (res.data.flag) {
							this.content = res.data.listFavor
						} else {
							Toast.text({
								duration: 1000,
								message: res.data.msg
							});
						}
					})
				}
			},
			videoPlay: function(res) {
				// 点击播放视频
				if (res.isVideo == 1) {
					this.videoUrl = res.url;
					this.isPlay = true;
					this.isNone = true;
				}
			},
			surtChild: function(data) {
				this.isPlay = false;
				this.isNone = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/mineCollector.scss';
</style>
