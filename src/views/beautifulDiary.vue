<template>
	<div>
		<div class="diarySwiper">
			<div class="diarySwiperImg">
				<wv-swipe :autoplay="4000" class="diarySwiperImg">
					<wv-swipe-item  v-for="item in swipeContent"> 
						<img :src="item.cover" class="diaryImgA" v-if="item.cover!=null"/>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="mation" v-for="item in dataList" :key="item.id">
			<div class="mationTop">
				<div>
					<img :src="item.headimg" />
				</div>
				<div>
					<p>{{item.vipName}}</p>
					<p>{{item.date10}}</p>
				</div>
			</div>
			<div class="mationCenter">
				<div v-for="item2 in item.listCover" :key="item2" @click="videoPlay(item2)">
					<img :src="item2.cover" />
					<div class="playImg" v-if="item2.isVideo==1">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="mationBottom" @click="goDiaryDetail(item.id)">
				<p>{{item.content}}</p>
			</div>
			<div class="mationBottom" @click="goDiaryDetail(item.id)">
				<p style="text-align:right;color:#434c53;">
					{{item.brows}}人来过
				</p>
			</div>
		</div>
		<div class="briefImg" v-if="isPlay">
			<Video-Play :videoUrl="videoUrl"></Video-Play>
		</div>
		<div style="height: 20px;"></div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import VideoPlay from '@/components/bigWindowVideo';
export default {
    name: 'beautifulDiary',
    data() {
        return {
            dataList: [],
            isPlay: false,
            swipeContent: ''
        };
    },
    components: {
        'Video-Play': VideoPlay
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: false
        });
        api.getBeautifulDiary({
            data: {
                openid: this.globalData.openid
            }
        }).then(res => {
            if (res.data.flag) {
                console.log(res.data);
                this.dataList = res.data.listDiary;
                this.swipeContent = res.data.listBanner;
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
            if (res.isVideo == 1) {
                this.videoUrl = res.url;
                this.isPlay = true;
            }
        },
        goDiaryDetail: function(res) {
            // 进入美丽日记详情
            this.$router.push({ name: 'diaryDetails', params: { diaryId: res } });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Index.scss';
@import '@/assets/css/beautifulDiary.scss';
</style>
