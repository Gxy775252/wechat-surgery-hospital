<template>
	<div>
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item  v-for="item in swipeContent"> 
						<img :src="item.cover" class="imgA"/>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="doctorTitle">
			<div>
				<!-- <img :src="configImg" /> -->
				<img src="@/assets/images/example/instrumentTextImg.png" />
			</div>
		</div>
		<div class="bigBox">
			<div v-for="item in dataList" class="contentBox">
				<div class="listImg" @click="videoPlay(item)">
					<img :src="item.coverResource.cover" />
				</div>
				<div class="listContent">
					<div>
						<div class="listFont">{{item.name}}</div>
						<div class="listConten">{{item.brief}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'we-vue';
import { Authorization, parseUrl } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
Vue.use(Swipe).use(SwipeItem);
import VideoPlay from '@/components/bigWindowVideo';
export default {
    name: 'instrumentList',
    data() {
        return {
            dataList: '',
            swipeContent: '',
            configImg: ''
        };
    },
    components: {
        'Video-Play': VideoPlay
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: false
        });

        api.getInstrumentList({
            data: {
                openid: this.globalData.openid
            }
        }).then(res => {
            if (res.data.flag) {
                console.log(res.data);
                for (let i = 0; i < res.data.listInst.length; i++) {
                    res.data.listInst[i].isPlay = false;
                }
                this.dataList = res.data.listInst;
                this.swipeContent = res.data.listBanner;
                this.configImg = res.data.config.listInstPic;
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
            console.log(res);
            // 			for (let i = 0; i < this.dataList.length; i++) {
            // 				if (this.dataList[i].id == res.id && res.coverResource.isVideo == 1) {
            // 					this.dataList[i].isPlay = true;
            // 					this.videoUrl = res.coverResource.url;
            // 				} else {
            // 					this.dataList[i].isPlay = false;
            // 				}
            // 			}
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/instrumentList.scss';
@import '@/assets/css/doctorList.scss';
</style>
