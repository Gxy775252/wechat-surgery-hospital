<template>
	<div>
		<div class="mallTop">
			<div class="mallCenter">
				<div class="mallImg">
					<img src="@/assets/images/icon/search.png" />
				</div>
				<p>搜索商品</p>	
			</div>
		</div>
		<div class="navList" >
			<p @click="select_P(0)" :class="selectId==0?'selection':''">全部</p>
			<p v-for="item in listClassifyInfo" :key="item.id" :class="item.id==selectId?'selection':''" @click="select_P(item.id)">{{item.name}}</p>
		</div>
		<div class="swiper">
			<div>
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="item in listBannerInfo" :key="item.id">
						<img :src="item.cover" class="imgA"/>
						<!-- <div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div> -->
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="centerImg">
			<div class="left">
				<img src="@/assets/images/example/tuOne.png" />
			</div>
			<div class="right">
				<div class="top">
					<img src="@/assets/images/example/tuTwo.png" />
				</div>
				<div class="bottom">
					<div>
						<img src="@/assets/images/example/tuThree.png" />
					</div>
					<div>
						<img src="@/assets/images/example/tuFour.png" />
					</div>
				</div>
			</div>
		</div>
		<div class="diary">
			<div class="diaryLeft">
				<img src="@/assets/images/icon/level.jpg"/>
				<p>热销商品</p>
			</div>
		</div>
		<div class="list">
			<div class="listText" v-for="item in listHotInfo" :key="item.id">
				<div class="listImg">
					<img src="@/assets/images/example/yiqi.png" />
				</div>
				<div class="listContent" @click="goCommodityDetail(item.id)">
					<p class="lctA">{{item.name}}</p>
					<p class="lctB">{{item.brief}}</p>
					<div class="lctC">
						<p>￥ {{item.price}}</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/seeI.png" />
		</div>
		<div style="height:6rem;background-color:#f7f7f7;"></div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'we-vue';
import * as api from '@/assets/js/api';
Vue.use(Swipe).use(SwipeItem);
export default {
	data() {
		return {
			listBannerInfo: '', //轮播
			listClassifyInfo: '', //分类列表
			listHotInfo: '', //热门商品
			selectId: 0 //分类选中 0=全部
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: true
		});
		api.getShoppingMall({
			data: {
				openid: this.globalData.openid,
				classifyid: 0 //0，表示全部
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('商城首页内容', res.data);
				this.listBannerInfo = res.data.listBanner; //轮播内容
				this.listClassifyInfo = res.data.listClassify; //分类列表
				this.listHotInfo = res.data.listHot; //热门商品
			} else {
				Toast.text({
					duration: 1000,
					message: '请求失败'
				});
			}
		});
	},
	methods: {
		select_P: function(res) {
			// 跳转商品列表并将当前点击的分类id传入
			this.$router.push({ name: 'commodityList', params: { shopId: res } });
		},
		goCommodityDetail: function(res) {
			// 跳转商品详情并将当前点击的商品id传入
			this.$router.push({ name: 'commodityDetail', params: { shopId: res } });
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/shoppingMall.scss';
@import '@/assets/css/commodityList.scss';
@import '@/assets/css/Index.scss';
</style>
