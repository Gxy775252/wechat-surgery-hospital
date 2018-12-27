<template>
	<div>
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item  v-for="item in swipeContent"> 
						<img :src="item.cover" />
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="doctorTitle">
			<div>
				<!-- <img :src="configImg" /> -->
				<img src="@/assets/images/example/doctorTextImg.png" />
			</div>
		</div>
		<div class="doctorBrief" v-for="item in dataList" >
			<div class="briefImg" @click="videoPlay(item)" v-if="!item.isPlay">
				<img :src="item.coverResource.cover" />
				<div class="playImg" v-if="item.coverResource.isVideo==1">
					<img  src="@/assets/images/icon/playImg.png"/>
				</div>
			</div>
			<div class="briefImg" v-if="item.isPlay">
				<Video-Play :videoUrl="videoUrl" :autoplay="autoplay" :controls="controls"></Video-Play>
			</div>
			<div class="briefText" @click="goDoctorDetail(item.id)">
				<div>
					<p>{{item.name}}</p>
					<p></p>
					<p>{{item.title}}</p>
				</div>
				<p>{{item.brief}}</p>
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
            controls: 'controls'
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
                console.log(res.data.listBanner);
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
        videoPlay: function(res) {
            // 点击播放视频
            for (let i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].id == res.id && res.coverResource.isVideo == 1) {
                    this.dataList[i].isPlay = true;
                    this.videoUrl = res.coverResource.url;
                } else {
                    this.dataList[i].isPlay = false;
                }
            }
        },
        goDoctorDetail: function(id) {
            // 跳转医生详情并将当前点击的医生id传入
            console.log('打印了-----', id);
            this.$router.push({ name: 'docInfo', params: { doctorId: id } });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/doctorList.scss';
@import '@/assets/css/Index.scss';
</style>
