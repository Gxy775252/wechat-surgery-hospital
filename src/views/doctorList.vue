<!-- 医生列表 -->
<template>
	<div class="all">
		<div class="header">
			<div class="swiper">
				<div class="swiperImg">
					<wv-swipe :autoplay="4000" class="swiperImg"v-if="isId!=-1">
						<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key" v-if="swipeContent.length!=0">
							<img :src="item.cover || ImgNull" class="imgA" @click="funcitonA(item.sourceid)" v-if="item.redirectType==0" />
							<div v-if="item.isVideo==1" class="playImg" @click.stop="isIdFun(item.url,-1)">
								<img src="@/assets/images/icon/playImg.png" />
							</div>
						</wv-swipe-item>
					</wv-swipe>
					<Samll-Video class="swiperImg" @surt="surt" v-if="isId==-1" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
				</div>
			</div>
		</div>
		<div class="doctorList" v-for="(item,key,index) in dataList" :key="key">
			<div class="box">
				<div class="boxTop" @click="goDoctorDetail(item.id)">
					<div class="headImg">
						<img :src="item.headimg || ImgNull" />
					</div>
					<div class="headName">
						<p>{{item.name}}/DrQi</p>
						<p>{{item.title}}</p>
					</div>
					<div class="headXian">
						<img src="@/assets/images/icon/level.jpg" />
					</div>
				</div>
				<div class="boxTop" @click="goDoctorDetail(item.id)">
					<div class="docInfo">
						<img src="@/assets/images/icon/docInfo.png" />
					</div>
					<div class="docName" v-html="item.brief"></div>
				</div>
				<div class="boxBottom" v-if="item.coverResource!=null && isId!=item.id">
					<img :src="item.coverResource.cover || ImgNull" />
					<div v-if="item.coverResource.isVideo==1 " class="playImg" @click="isIdFun(item.coverResource.url,item.id)">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
				<Samll-Video class="boxBottom" @surt="surt" v-if="isId==item.id" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
				<div style='height:1px'></div>
			</div>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	// import HelloWorld from '@/components/HelloWorld.vue'
	import Vue from 'vue';
	import {
		Swipe,
		SwipeItem
	} from 'we-vue';
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	Vue.use(Swipe).use(SwipeItem);
	import SamllVideo from '@/components/samllVideoPlay.vue';
	export default {
		name: 'doctorList',
		data() {
			return {
				dataList: '',
				swipeContent: '',
				configImg: '',
				videoUrl: '',
				autoplay: 'autoplay',
				controls: 'controls',
				ImgNull: this.$store.state.ImgNull,
				isId: 0,
				aspectRatio: '16:9',
				aspectRatio2: '14:9'
			};
		},
		components: {
			'Samll-Video': SamllVideo
		},
		created: function() {
			this.$store.commit('showBottomNav', {
				isShow: false
			});
			api.getDoctorList({
				data: {
					openid: this.$store.state.uid
				}
			}).then(res => {
				if (res.data.flag) {
					res.data.listBanner = [{
							id: 1,
							isVideo: "0",
							cover: "http://tcjh.suitang1973.com/pic/cover1.jpg",
							url: "http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4",
							sourceid: '1',
							redirectType: '0',
							//0医生 1仪器 2商品 3项目
						},
						{
							id: 2,
							isVideo: "1",
							cover: "http://tcjh.suitang1973.com/pic/cover1.jpg",
							url: "http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4",
							sourceid: '1',
							redirectType: '0',
						},
					]
					console.log('医生列表', res.data);
					for (let i = 0; i < res.data.listDoctor.length; i++) {
						res.data.listDoctor[i].isPlay = false;
					}
					this.dataList = res.data.listDoctor;
					this.swipeContent = res.data.listBanner;
					this.configImg = res.data.config.listDoctorPic;
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		methods: {
			goDoctorDetail: function(id) {
				// 跳转医生详情并将当前点击的医生id缓存
				session.Lstorage.setItem('doctorId', id);
				this.$router.push({
					name: 'docInfo'
				});
			},
			isIdFun: function(url, id) {
				this.isId = id;
				this.videoUrl = url
			},
			funcitonA: function(res) {
				session.Lstorage.setItem('doctorId', res);
				this.$router.push({
					name: 'docInfo'
				});
			},
			surt: function(e) {
				this.isId = e
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/doctorList.scss';

	.header {
		padding: 0.93rem 0.6rem;
		background: #fff;
	}
</style>
