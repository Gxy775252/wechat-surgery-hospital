<template>
	<div class="all">
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key"> 
						<img :src="item.cover || doctorImgNull" class="imgA"/>
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
	<!--<div class="doctorTitle">
			<div>
				<img :src="configImg" />
				<img src="@/assets/images/example/doctorTextImg.png" />
			</div>
		</div> -->
		<div class="doctorList" v-for="(item,key,index) in dataList" :key="key">
			<div class="box" @click="goDoctorDetail(item.id)">
				<div class="boxTop">
					<div class="headImg">
						<img :src="doctorImgNull" />
					</div>
					<div class="headName">
						<p>{{item.name}}/DrQi</p>
						<p>{{item.title}}</p>
					</div>
					<div class="headXian">
						<img src="@/assets/images/icon/level.jpg" />
					</div>
				</div>
				<div class="boxTop">
					<div class="docInfo">
						<img src="@/assets/images/icon/docInfo.png" />
					</div>
					<div class="docName" v-html="item.brief"></div>
				</div>
				<div class="boxBottom">
					<img :src="doctorImgNull" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import VideoPlay from '@/components/videoPlay';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'we-vue';
import { Authorization, parseUrl, showBottomNav } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
Vue.use(Swipe).use(SwipeItem);
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
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	components: {
		'Video-Play': VideoPlay
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		api.getDoctorList({
			data: {
				openid: this.globalData.openid
			}
		}).then(res => {
			if (res.data.flag) {
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
					message: '请求失败'
				});
			}
		});
	},
	methods: {
// 		videoPlay: function(res) {
// 			// 点击播放视频
// 			for (let i = 0; i < this.dataList.length; i++) {
// 				if (this.dataList[i].id == res.id && res.coverResource.isVideo == 1) {
// 					this.dataList[i].isPlay = true;
// 					this.videoUrl = res.coverResource.url;
// 				} else {
// 					this.dataList[i].isPlay = false;
// 				}
// 			}
// 		},
		goDoctorDetail: function(id) {
			// 跳转医生详情并将当前点击的医生id传入
			this.$router.push({ name: 'docInfo', params: { doctorId: id } });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/doctorList.scss';
</style>
