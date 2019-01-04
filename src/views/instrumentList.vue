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
<!-- 		<div class="doctorTitle">
			<div>
				<img :src="configImg" />
				<img src="@/assets/images/example/instrumentTextImg.png" />
			</div>
		</div> -->
		<div class="listAll">
			<div class="insList">
				<div class="insImg">
					<img :src="doctorImgNull" />
				</div>
				<div class="insInfo">
					<p>美容仪器</p>
					<p>欢子u卓越的医疗美容仪器顶尖医学专家</p>
				</div>
			</div>
			<div style="clear: both;"></div>
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
            configImg: '',
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

        api.getInstrumentList({
            data: {
                openid: this.globalData.openid
            }
        }).then(res => {
            if (res.data.flag) {
                console.log("美丽日记",res.data);
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
