<!-- 仪器列表 -->
<template>
	<div class="all">
		<div class="header">
			<div class="swiper">
				<div class="swiperImg">
					<wv-swipe :autoplay="4000" class="swiperImg" v-if="isId!=-1">
						<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key">
							<img :src="item.cover || ImgNull" class="imgA" @click="goDetail(item.id)" />
							<div v-if="item.isVideo==1" class="playImg" @click.stop="isIdFun(item.url,-1)">
								<img src="@/assets/images/icon/playImg.png" />
							</div>
						</wv-swipe-item>
					</wv-swipe>
					<Samll-Video class="swiperImg" @surt="surtA" v-if="isId==-1" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
				</div>
			</div>
		</div>
		<div class="listAll" v-for="(item,key,index) in dataList" :key='key'>
			<div class="insList">
				<div class="insImg">
					<img :src="item.coverResource.cover  || ImgNull" @click="goDetail(item.id)"/>
					<div v-if="item.coverResource.isVideo==1" class="playImg" @click.stop="isVideoFun(item.coverResource.url)">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
				<div class="insInfo" @click="goDetail(item.id)">
					<p>{{item.name}}{{item.url}}</p>
					<p>{{item.brief}}</p>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div v-if="isVideoPlay">
			<Video-Play :videoUrl="videoUrl" @surt='surt' :isNone="isNone"></Video-Play>
		</div>
	</div>
</template>

<script>
	import VideoPlay from '@/components/videoPlay.vue'
	import SamllVideo from '@/components/samllVideoPlay.vue';
	import Vue from 'vue';
	import {
		Swipe,
		SwipeItem,
		Toast
	} from 'we-vue';
	import {
		Authorization,
		parseUrl
	} from '@/assets/js/utils';
	import wx from 'weixin-js-sdk';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	Vue.use(Swipe).use(SwipeItem);
	export default {
		name: 'instrumentList',
		data() {
			return {
				dataList: '',
				swipeContent: '',
				ImgNull: this.$store.state.ImgNull,
				isVideoPlay: false,
				videoUrl: '',
				isNone: 'false',
				isId: 0,
				aspectRatio: '16:9',
			};
		},
		components: {
			'Video-Play': VideoPlay,
			'Samll-Video': SamllVideo
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});

			api.getInstrumentList({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('美丽日记', res.data);
					this.dataList = res.data.listInst; //仪器列表
					this.swipeContent = res.data.listBanner; //轮播列表
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			isVideoFun: function(e) {;
				this.videoUrl = e;
				this.isVideoPlay = true;
				this.isNone = true;
				this.isId = 0;
			},
			surt: function(e) {
				this.isNone = false;
				this.isVideoPlay = false;
			},
			isIdFun: function(url, id) {
				this.isId = id;
				this.videoUrl = url
			},
			surtA: function(e) {
				this.isId = e
			},
			goDetail: function(res) {
				// 跳转到仪器详情并将仪器id缓存
				session.Lstorage.setItem('instr', res);
				this.$router.push({
					name: 'instrumentDetail'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/instrumentList.scss';
	@import '@/assets/css/doctorList.scss';

	.header {
		padding: 0.93rem 0.6rem;
		background: #fff;
	}
</style>
