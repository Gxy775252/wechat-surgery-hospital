<!-- 商品详情 -->
<template>
	<div class="all">
		<div class="topSwiper">
			<div class="swiper">
				<div class="swiperImg">
					<wv-swipe  :autoplay="4000" class="swiperImg">
						<wv-swipe-item>
							<img src="@/assets/images/example/doctor.png" />	
						</wv-swipe-item>
						<wv-swipe-item>
							<img src="@/assets/images/example/doctor.png" />	
						</wv-swipe-item>
						<wv-swipe-item>
							<img src="@/assets/images/example/doctore.png" />	
						</wv-swipe-item>
					</wv-swipe>
				</div>
			</div>
		</div>
		<div class="text">
			<p>活力眼凝胶</p>
			<p>香调浓郁，持久清爽，纯植物配方香调浓郁，持久清爽，纯植物配方</p>
			<p>￥ 99</p>
		</div>
		<div class="selector">
			<div class="selectorDiv">
				<p>请选择规格</p>
				<div>
					<img src="@/assets/images/icon/horn.png" />
				</div>
			</div>
			<div class="selectorDiv">
				<p>参数</p>
				<div>
					<img src="@/assets/images/icon/horn.png" />
				</div>
			</div>
		</div>
		<div>
			<div class="diary">
				<div class="diaryLeft">
					<img src="@/assets/images/icon/level.jpg"/>
					<p>评价（10）</p>
				</div>
			</div>
			<div class="evaluate">
				<div class="evalTop">
					<div class="topInfor">
						<div>
							<img src="@/assets/images/icon/cart.png" />
						</div>
						<div class="CDsecod">
							<p>用户29089</p>
							<p>2018-10-20 14:09</p>
						</div>
					</div>
					<div class="topStars">
						<div>
							<img src="@/assets/images/icon/smallStars.png" />
						</div>
						
					</div>
				</div>
				<div class="evaluateContent">
					<p>快递很快两天就到了，东西挺好的，用着挺好，会回购</p>
				</div>
				<div class="evaluateSee">
					<div>查看全部评价</div>
				</div>
			</div>
		</div>
		<div>
			<div class="diary">
				<div class="diaryLeft">
					<img src="@/assets/images/icon/level.jpg"/>
					<p>图文详情</p>
				</div>
			</div>
			<div class="editor">
				<div>图文详情介绍</div>
			</div>
		</div>
		<div>
			<div class="diary">
				<div class="diaryLeft">
					<img src="@/assets/images/icon/level.jpg"/>
					<p>相关推荐</p>
				</div>
			</div>
			<div class="recommend">
				<div class="recommendContent">
					<div class="rcImg">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<p class="rcTitle">活力眼凝胶</p>
					<p class="rcBrief">香调浓郁，持久清爽重制物配方</p>
					<p class="rcPrice">￥ 99</p>
				</div>
				<div class="recommendContent">
					<div class="rcImg">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<p class="rcTitle">活力眼凝胶</p>
					<p class="rcBrief">香调浓郁，持久清爽重制物配方</p>
					<p class="rcPrice">￥ 99</p>
				</div>
				<div class="recommendContent">
					<div class="rcImg">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<p class="rcTitle">活力眼凝胶</p>
					<p class="rcBrief">香调浓郁，持久清爽重制物配方</p>
					<p class="rcPrice">￥ 99</p>
				</div>
			</div>
		</div>
		<div class="bottomOperation">
			<div class="leftOperation">
				<div>
					<div>
						<img src="@/assets/images/icon/returnIndex.png" />
					</div>
					<p>首页</p>
				</div>
				<div>
					<div>
						<img src="@/assets/images/icon/collection.png" />
					</div>
					<p>收藏</p>
				</div>
			</div>
			<div class="centerOperation">加入购物车</div>
			<div class="rightOperation">立即购买</div>
		</div>
		<div class="cart">
			<img src="@/assets/images/icon/cart.png" />
		</div>
		<div style="height: 6rem;"></div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'we-vue';
Vue.use(Swipe).use(SwipeItem);
export default {
    name: 'commodityDetail',
    data() {
        return {};
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: false
        });
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityDetail.scss';
@import '@/assets/css/Index.scss';
</style>
