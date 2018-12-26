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
		<div class="navList">
			<!-- class="selection" 选中时的样式 -->
			<p>全部商品</p>
			<p>商品分类</p>
			<p>电器分类</p>
			<p>家用物品</p>
			<p>家</p>
			<p>家物品</p>
		</div>
		<div class="swiper">
			<div class="swiperImg">
				<wv-swipe  :autoplay="4000" class="swiperImg">
					<wv-swipe-item>
						<img src="@/assets/images/example/doctore.png" />	
					</wv-swipe-item>
					<wv-swipe-item>
						<img src="@/assets/images/example/doctore.png" />	
					</wv-swipe-item>
					<wv-swipe-item>
						<img src="@/assets/images/example/doctore.png" />	
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
			<div class="listText">
				<div class="listImg">
					<img src="@/assets/images/example/yiqi.png" />
				</div>
				<div class="listContent">
					<p class="lctA">活力眼凝胶</p>
					<p class="lctB">香调浓郁，持久清爽，纯植物配方</p>
					<div class="lctC">
						<p>￥ 99</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="height:6rem;"></div>
	</div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'we-vue';
Vue.use(Swipe).use(SwipeItem);
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/shoppingMall.scss';
@import '@/assets/css/commodityList.scss';
@import '@/assets/css/Index.scss';
</style>
