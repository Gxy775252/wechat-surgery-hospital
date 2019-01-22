<!-- 医生列表 -->
<template>
	<div class="all">
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key" v-if="swipeContent.length!=0">
						<img :src="item.cover || ImgNull" class="imgA"/>
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
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
				<div class="boxBottom" v-if="item.coverResource!=null">
					<img :src="item.coverResource.cover || ImgNull"/>
					<div v-if="item.coverResource.isVideo==1" class="playImg">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue';
import { Swipe, SwipeItem } from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
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
			ImgNull: this.$store.state.ImgNull
		};
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
		// 待修改 还未处理视频播放功能
		goDoctorDetail: function(id) {
			// 跳转医生详情并将当前点击的医生id缓存
			session.Lstorage.setItem('doctorId', id);
			this.$router.push({ name: 'docInfo' });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/doctorList.scss';
</style>
