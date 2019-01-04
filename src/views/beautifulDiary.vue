<template>
	<div class="all">
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key"> 
						<img :src="doctorImgNull" class="imgA"/>
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="mation" v-for="(item,key,index) in dataList" :key="key">
			<div class="mationTop">
				<div>
					<img :src="item.headimg" />
				</div>
				<div>
					<p>{{item.vipName}}</p>
					<p>11月 &nbsp; 12日</p>
				</div>
			</div>
			<div class="mationCenter">
				<div v-for="(item2,key,index) in item.listCover" :key="key" @click="videoPlay(item2)">
					<img :src="doctorImgNull" />
					<!-- <div class="playImg" v-if="item2.isVideo==1">
						<img src="@/assets/images/icon/playImg.png" />
					</div> -->
				</div>
			</div>
			<div class="mationCon" @click="goDiaryDetail(item.id)">
				<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>大家好我又来更新日记了，现在做完现在做完现在做完现在做完现在做完ST全脸脂肪填充已经恢复很好了，</p>
			</div>
			<div class="xian"></div>
			<div class="mationBottom" @click="goDiaryDetail(item.id)">
				<p>
					1000人来过
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import VideoPlay from '@/components/bigWindowVideo';
import { Swipe, SwipeItem } from 'we-vue';
Vue.use(Swipe).use(SwipeItem);
export default {
	name: 'beautifulDiary',
	data() {
		return {
			dataList: '',
			isPlay: false,
			swipeContent: '',
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
		api.getBeautifulDiary({
			data: {
				openid: this.globalData.openid
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('美丽日记', res.data);
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
@import '@/assets/css/beautifulDiary.scss';
</style>
