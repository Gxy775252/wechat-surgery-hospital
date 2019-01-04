<!-- 首页 -->
<template>
	<div>
		<div class="TopContent">
			<div class="logo">
				<img src="@/assets/images/icon/logo.png" />
			</div>
			<div class="search" @click="goSearch()">
				<img src="@/assets/images/icon/search.png" />
			</div>
		</div>
		<div class="swiper">
			<div>
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
						<img :src="item.cover || doctorImgNull" class="imgA"/>
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="doctor">
			<div class="doctorImg">
				<img src="@/assets/images/example/doctor.png" />
			</div>
			<div class="doctorText">
				<div class="centerText">
					<img src="@/assets/css/indexDoctor.png" />
					<!-- <img :src="configImg.homeDoctorPic" /> -->
				</div>
				<div class="bottomText" style="left:0.66rem;" @click="goDoctorList()">
					<p>查看更多医生</p>
					<img src="@/assets/images/icon/rightColor.png" />
				</div>
			</div>
		</div>
		<div class="doctor">
			<div class="doctorText" style="border-left: 1px solid #008e83;border-right:0;margin-left: 6px;">
				<div class="centerText" style="text-align: right;margin-right:0.66rem;">
					<img src="@/assets/css/indexInstrument.png" />
					<!-- <img :src="configImg.homeInstPic" /> -->
				</div>
				<div class="bottomText" style="right:0.66rem;" @click="goInstrumentList()">
					<img src="@/assets/images/icon/rightColor.png" style="transform:rotate(180deg);margin: 0 0.3rem 0 0;" />
					<p>查看更多仪器</p>
				</div>
			</div>
			<div class="doctorImg">
				<img src="@/assets/images/example/doctor.png" />
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg" />
				<p>美丽日记</p>
			</div>
			<div class="diaryRight" @click="gobeautifulDiary()">
				<p>MORE</p>
				<img src="@/assets/images/icon/rightGray.png" />
			</div>
		</div>
		<div class="mation" v-for="(item,key,index) in diaryLisy" :key="key">
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
				<div v-for="(item2,key,index) in item.listResource" :key="key" @click="videoPlay(item2)">
					<img :src="item2.cover || doctorImgNull" />
					<div class="playImg" v-if="item2.isVideo==1">
						<img src="@/assets/images/icon/playImg.png" />
					</div>
				</div>
			</div>
			<div class="mationCon">
				<p><span>[医美整形-ST全脸字体脂肪填充-第99天]</span>大家好我又来更新日记了，现在做完现在做完现在做完现在做完现在做完ST全脸脂肪填充已经恢复很好了，</p>
			</div>
			<div class="xian"></div>
			<div class="mationBottom">
				<p>
					1000人来过
				</p>
			</div>
		</div>
		<div class="select">
			<div style="padding:1.7rem 0;">
				<img src="@/assets/images/icon/level.jpg" class="line" />
				<p>皮肤分析</p>
				<img src="@/assets/images/icon/level.jpg" class="line" />
			</div>
			<div>
				<select class="options" v-for="item in selectList" :key="item.id">
					<option :id="item.id">{{item.title}}</option>
				</select>
			</div>
		</div>
		<div class="mationImg">
			<img :src="configImg.indexPic" />
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/seeI.png" />
		</div>
		<div class="briefImg" v-if="isPlay">
			<Video-Play :videoUrl="videoUrl"></Video-Play>
		</div>
		<div style="height:6rem;"></div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue';
import { Swipe, SwipeItem, Flex, FlexItem } from 'we-vue';
import { Authorization, parseUrl } from '@/assets/js/utils';
import wx from 'weixin-js-sdk';
import * as api from '@/assets/js/api';
import VideoPlay from '@/components/bigWindowVideo';

Vue.use(Swipe)
	.use(SwipeItem)
	.use(Flex)
	.use(FlexItem);

export default {
	name: 'index',
	data() {
		return {
			isPlay: false,
			swipeContent: '',
			configImg: '',
			selectList: '',
			diaryLisy: '',
			shoppingImgNull: this.$store.state.shoppingImgNull,
			doctorImgNull: this.$store.state.doctorImgNull
		};
	},
	components: {
		'Video-Play': VideoPlay
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: true
		});

		api.getIndex({
			data: {
				openid: this.globalData.openid
			}
		}).then(res => {
			console.log('首页请求数据', res.data);
			if (res.data.flag) {
				this.configImg = res.data.config; //就那个看见自己上面的图，还有轮播下面的图；
				this.swipeContent = res.data.listBanner; //轮播
				this.selectList = res.data.listQa; //下拉框
				this.diaryLisy = res.data.listDiary; //美丽日记内容
			} else {
				Toast.text({
					duration: 1000,
					message: '请求失败'
				});
			}
		});
	},
	methods: {
		goDoctorList: function() {
			console.log('暂无搜索页面');
			// 暂无搜索页面
			// this.$router.push({ name: 'search'});
		},
		goDoctorList: function() {
			//跳医生列表
			this.$router.push({
				name: 'doctorList'
			});
		},
		goInstrumentList: function() {
			// 跳仪器列表
			this.$router.push({
				name: 'instrumentList'
			});
		},
		gobeautifulDiary: function() {
			// 跳美丽日记
			this.$router.push({
				name: 'beautifulDiary'
			});
		},
		videoPlay: function(res) {
			// 点击播放视频
			if (res.isVideo == 1) {
				this.videoUrl = res.url;
				this.isPlay = true;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/Index.scss';
</style>
