<!-- 商品详情 -->
<template>
	<div class="all">
		<div class="swiper">
			<div>
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
						<img :src="item.cover || ImgNull" class="imgA"/>
						<div v-if="item.isVideo==1" class="playImg">
							<img src="@/assets/images/icon/playImg.png" />
						</div>
					</wv-swipe-item>
				</wv-swipe>
			</div>
		</div>
		<div class="text">
			<p>{{goodsinfo.name}}</p>
			<p>{{goodsinfo.brief}}</p>
			<p>￥ {{goodsinfo.price}}</p>
		</div>
		<div class="selector">
			<div class="selectorDiv">
				<p>请选择规格</p>
				<div>
					<img src="@/assets/images/icon/horn.png" />
				</div>
			</div>
			<!-- <div class="selectorDiv">
				<p>参数</p>
				<div>
					<img src="@/assets/images/icon/horn.png" />
				</div>
			</div> 19-1-10 参数功能无用-->
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
				<div v-html="goodsinfo.content"></div>
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
					<div class="imgA">
						<img src="@/assets/images/icon/returnIndex.png" />
					</div>
					<p>首页</p>
				</div>
				<div @click="collection(goodsinfo.id)">
					<div class="imgA">
						<img src="@/assets/images/icon/collection.png" v-show="!ifCollection"/>
						<img src="@/assets/images/icon/collectionGray.png" v-show="ifCollection"/>
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
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div style="height: 3rem;"></div>
		<!-- 加入购物车或立即购买规格弹层内容 -->
		<!-- <div class="selectModel">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<div class="modelTop-center">
						<p>￥ 99</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p>20ml</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>有</p>
				</div>
				<div class="sum">
					<p>
						购买数量
					</p>
				</div>
				<button class="success">确定</button> 
				<button class="error">该商品无货</button>
			</div>
		</div>-->
		<!-- 加入购物车或立即购买规格弹层内容 END-->
		<!-- 选择规格 -->
<!-- 		<div class="selectModel">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<div class="modelTop-center">
						<p>￥ 99</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p>20ml</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>有</p>
				</div>
				<div class="sum">
					<p>
						购买数量
					</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(1)">-</button>
							<p>1</p>
							<button @click="plus(1)">+</button>
						</div>
					</div>
				</div>
				<div class="bottomA">
					<button>加入购物车</button>
					<button>立即购买</button>
				</div>
			</div>
		</div> -->
		<!-- 选择规格 END-->
	</div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Toast } from 'we-vue';
Vue.use(Swipe).use(SwipeItem);
import * as api from '@/assets/js/api';
export default {
	name: 'commodityDetail',
	data() {
		return {
			shopId: 0, //商品id
			swipeContent: '', //轮播
			listSizeinfo: '', //规格中的尺码
			listCommentsinfo: '', //评论列表
			goodsinfo: '', //商品内容
			ifCollection: false, //是否收藏
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		this.shopId = this.$route.params.shopId;
		// 商品详情
		api.getCommodityDetail({
			data: {
				openid: this.globalData.openid,
				// id: this.shopId,
				id: 14
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('商城详情内容', res.data);
				this.swipeContent = res.data.listBanner; //轮播
				this.listSizeinfo = res.data.listSize; //规格中的尺码
				this.listCommentsinfo = res.data.listComments; //评论列表
				this.goodsinfo = res.data.goods; //商品内容
			} else {
				Toast.text({
					duration: 1000,
					message: '请求失败'
				});
			}
		});
		// 评论
		api.getAllComments({
			data: {
				openid: this.globalData.openid,
				// goodsid:this.shopId,
				goodsid: 14
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('评论内容', res.data);
			} else {
				Toast.text({
					duration: 1000,
					message: '请求失败'
				});
			}
		});
	},
	methods: {
		// 减号
		reduce(res) {},
		// 加号
		plus(res) {},
		collection(res) {
			// 收藏
			if (this.ifCollection) {
				api.getFavorGoods({
					data: {
						openid: this.globalData.openid,
						goodsid: res
					}
				}).then(res => {
					if (res.data.flag) {
						this.ifCollection = false;
					} else {
						Toast.text({
							duration: 1000,
							message: '请求失败'
						});
					}
				});
			} else {
				api.getFavorGoods({
					data: {
						openid: this.globalData.openid,
						goodsid: res
					}
				}).then(res => {
					if (res.data.flag) {
						this.ifCollection = true;
					} else {
						Toast.text({
							duration: 1000,
							message: '请求失败'
						});
					}
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityDetail.scss';
@import '@/assets/css/Index.scss';
</style>
