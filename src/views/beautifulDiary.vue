<!-- 美丽日记 -->
<template>
	<div class="all">
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item,key,index) in swipeContent" :key="key"> 
						<!-- <img :src="item.cover || ImgNull" class="imgA"/> -->
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="mation" v-for="(item,key,index) in dataListInfo" :key="key">
			<div class="mationTop">
				<div>
					<img :src="item.headimg || ImgNull" />
				</div>
				<div>
					<p>{{item.vipName}}</p>
					<p>{{item.date10}}</p>
				</div>
			</div>
			<div class="mationCenter">
				<div v-for="(item2,key,index) in item.listCover" :key="key">
					<!-- 待修改 图片资源没有 -->
					<!-- <img :src="item2.cover || ImgNull" /> -->
					<!-- <div class="playImg" v-if="item2.isVideo==1">
						<img src="@/assets/images/icon/playImg.png" />
					</div> -->
				</div>
			</div>
			<div class="mationCon" @click="goDiaryDetail(item.id)">
				<p><span>[{{item.prjName}}-第{{item.dayIndex}}天]</span>{{item.content}}</p>
			</div>
			<div class="xian"></div>
			<div class="mationBottom" @click="goDiaryDetail(item.id)">
				<p>
					{{item.brows}}人来过
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import * as api from '@/assets/js/api';
import { Swipe, SwipeItem, Toast } from 'we-vue';
import * as session from '@/assets/js/session';
Vue.use(Swipe).use(SwipeItem);
export default {
	name: 'beautifulDiary',
	data() {
		return {
			dataListInfo: '',
			isPlay: false,
			swipeContent: '',
			ImgNull: this.$store.state.ImgNull
		};
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
				this.dataListInfo = res.data.listDiary;
				this.swipeContent = res.data.listBanner;
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		goDiaryDetail: function(res) {
			// 进入美丽日记详情
			session.Lstorage.setItem('diaryId', res);
			this.$router.push({ name: 'diaryDetails' });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/beautifulDiary.scss';
</style>
