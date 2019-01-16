<!-- 商品详情 -->
<template>
	<div class="all">
		<div class="swiper">
			<div>
				<wv-swipe :autoplay="4000" class="swiperImg">
					<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
						<img :src="item.cover || ImgNull" class="imgA" />
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
			<div class="selectorDiv" @click="seeSize">
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
					<img src="@/assets/images/icon/level.jpg" />
					<p>评价（10）</p>
				</div>
			</div>
			<div class="evaluate" v-for="(item,key,index) in listCommentsInfo" :key='key'>
				<div class="evalTop">
					<div class="topInfor">
						<div>
							<img :src="item.headimg || ImgNull" />
						</div>
						<div class="CDsecod">
							<p>{{item.vipName}}</p>
							<p>{{item.createTime}}</p>
						</div>
					</div>
					<div class="topStars">
						<div v-for="(item,key,index) in item.stars" :key='key'>
							<img src="@/assets/images/icon/smallStars.png" />
						</div>
					</div>
				</div>
				<div class="evaluateContent">
					<p>{{item.comment}}</p>
				</div>
				<div class="evaluateSee" @click='goAllevaluate()'>
					<div>查看全部评价</div>
				</div>
			</div>
		</div>
		<div>
			<div class="diary">
				<div class="diaryLeft">
					<img src="@/assets/images/icon/level.jpg" />
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
					<img src="@/assets/images/icon/level.jpg" />
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
				<div style="width:1rem;"></div>
			</div>
		</div>
		<div class="bottomOperation">
			<div class="leftOperation">
				<div @click="goIndex()">
					<div class="imgA">
						<img src="@/assets/images/icon/returnIndex.png" />
					</div>
					<p>首页</p>
				</div>
				<div @click="collection(goodsinfo.id)">
					<div class="imgA">
						<img src="@/assets/images/icon/collection.png" v-show="ifCollection==0" />
						<img src="@/assets/images/icon/collectionGray.png" v-show="ifCollection==1" />
					</div>
					<p>收藏</p>
				</div>
			</div>
			<div class="centerOperation" @click="openaddSize()">加入购物车</div>
			<div class="rightOperation" @click="openbuySize()">立即购买</div>
		</div>
		<div class="cart" @click="goCart">
			<img src="@/assets/images/icon/cart.png" />
		</div>
		<div class="seeI">
			<img src="@/assets/images/icon/kanjian.png" />
		</div>
		<div style="height: 3rem;"></div>
		<!-- 加入购物车规格弹层内容 -->
		<div class="selectModel" v-if="addSizeHidden">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<div class="modelTop-center">
						<p>￥ 99</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close" @click="close()">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p v-for="(item,key,index) in listSizeInfo" :key='key' :class="sizeId==item.id?'colorA':''" @click="selectSize(item.id)">{{item.name}}</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>{{storage}}</p>
				</div>
				<div class="sum">
					<p>
						购买数量
					</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(num)">-</button>
							<p>{{num}}</p>
							<button @click="plus(num)">+</button>
						</div>
					</div>
				</div>
				<button class="success" @click="addToCart()" :disabled="disabled">确定</button>
				<!-- <button class="error">该商品无货</button> -->
			</div>
		</div>
		<!-- 加入购物车或立即购买规格弹层内容 END-->
		<!-- 加入购物车规格弹层内容 -->
		<div class="selectModel" v-if="buySizeHidden">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<div class="modelTop-center">
						<p>￥ 99</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close" @click="close()">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p v-for="(item,key,index) in listSizeInfo" :key='key' :class="sizeId==item.id?'colorA':''" @click="selectSize(item.id)">{{item.name}}</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>{{storage}}</p>
				</div>
				<div class="sum">
					<p>
						购买数量
					</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(num)">-</button>
							<p>{{num}}</p>
							<button @click="plus(num)">+</button>
						</div>
					</div>
				</div>
				<button class="success" @click="immediatePurchase()" :disabled="disabled">确定</button>
				<!-- <button class="error">该商品无货</button> -->
			</div>
		</div>
		<!-- 加入购物车或立即购买规格弹层内容 END-->
		<!-- 选择规格 -->
		<div class="selectModel" v-if="sizeHidden">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left">
						<img src="@/assets/images/example/yiqi.png" />
					</div>
					<div class="modelTop-center">
						<p>￥ 99</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close" @click="close()">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p v-for="(item,key,index) in listSizeInfo" :key='key' :class="sizeId==item.id?'colorA':''" @click="selectSize(item.id)">{{item.name}}</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>{{storage}}</p>
				</div>
				<div class="sum">
					<p>
						购买数量
					</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(num)">-</button>
							<p>{{num}}</p>
							<button @click="plus(num)">+</button>
						</div>
					</div>
				</div>
				<div class="bottomA">
					<button @click="addToCart()" :disabled="disabled">加入购物车</button>
					<button @click="immediatePurchase()" :disabled="disabled">立即购买</button>
				</div>
			</div>
		</div>
		<!-- 选择规格 END-->
	</div>
</template>

<script>
import Vue from 'vue';
import { Swipe, SwipeItem, Toast } from 'we-vue';
Vue.use(Swipe).use(SwipeItem);
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
export default {
	name: 'commodityDetail',
	data() {
		return {
			shopId: 0, //商品id
			swipeContent: '', //轮播
			listSizeInfo: '', //规格中的尺码
			listCommentsInfo: '', //评论列表
			goodsinfo: '', //商品内容
			ifCollection: '', //是否收藏
			num: 1, //默认为0
			addSizeHidden: false, //点击加入购物车
			buySizeHidden: false, //点击立即购买
			sizeHidden: false, //点击规格显示的弹层
			storage: '有', //库存
			sizeId: 0, //选择规格id
			disabled: false, //按钮能否点击
			ImgNull: this.$store.state.ImgNull
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		this.shopId = session.Lstorage.getItem('shopId');
		// 商品详情
		api.getCommodityDetail({
			data: {
				openid: this.globalData.openid,
				id: this.shopId
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('商城详情内容', res.data);
				this.ifCollection = res.data.favored; //是否收藏
				this.swipeContent = res.data.listBanner; //轮播
				this.listSizeInfo = res.data.listSize; //规格中的尺码
				this.listCommentsInfo = res.data.listComments; //评论列表
				this.goodsinfo = res.data.goods; //商品内容
				// 待修改 评价总数 相关推荐 尺码库存（都是缺少数据）
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		openaddSize: function() {
			// 通过加入点击显示的弹层
			this.addSizeHidden = true;
		},

		openbuySize: function() {
			// 通过加入点击显示的弹层
			this.buySizeHidden = true;
		},
		seeSize: function() {
			// 通过规格点击显示的弹层
			this.sizeHidden = true;
		},
		close: function() {
			// 关闭购买弹层
			this.sizeHidden = false;
			this.num = 1;
			this.sizeId = 0;
			this.addSizeHidden = false;
			this.buySizeHidden = false;
			this.disabled = false;
		},

		selectSize: function(res) {
			//选择规格
			console.log(res);
			this.sizeId = res;
		},

		reduce: function(res) {
			// 减号
			if (this.num > 1) {
				this.num -= 1;
			}
		},

		plus: function(res) {
			// 加号
			this.num += 1;
		},

		addToCart: function(res) {
			// 加入购物车
			if (this.sizeId == 0) {
				Toast.text({
					duration: 1000,
					message: '请选择规格'
				});
				return;
			}
			console.log('规格id', this.sizeid, '数目', this.num);
			this.disabled = true;
			api.addCart({
				data: {
					openid: this.globalData.openid,
					goodsid: 14,
					sizeid: this.sizeId,
					count: this.num
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('添加购物车', res.data);
					Toast.text({
						duration: 1000,
						message: '已加入购物车'
					});
					// 待修改 加入购物车后再购物车标志右上方出现数字设计图有
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
				this.disabled = false;
			});
		},

		immediatePurchase: function() {
			// 直接购买
			if (this.sizeId == 0) {
				Toast.text({
					duration: 1000,
					message: '请选择规格'
				});
				return;
			}
			console.log('规格id', this.sizeid, '数目', this.num);
			this.disabled = true;
			api.submitGoodsOrder({
				data: {
					openid: this.globalData.openid,
					fromCart: 0,
					goodsid: 14,
					sizeid: this.sizeId,
					count: this.num,
					cartidList: ''
				}
			}).then(res => {
				if (res.data.flag) {
					console.log('直接购买', res.data);
					// 待修改 生成订单id后 携带订单id跳转到订单确认页面
					session.Lstorage.setItem('orderId', res.data.orderid);
					this.$router.push({
						name: 'placeOrder',
					});
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
				this.disabled = false;
			});
		},

		collection: function(res) {
			// 收藏
			if (this.ifCollection == 0) {
				api.getFavorGoods({
					data: {
						openid: this.globalData.openid,
						goodsid: res
					}
				}).then(res => {
					if (res.data.flag) {
						this.ifCollection = 1;
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			} else if (this.ifCollection == 1) {
				api.unfavor({
					data: {
						openid: this.globalData.openid,
						goodsid: res
					}
				}).then(res => {
					if (res.data.flag) {
						this.ifCollection = 0;
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				});
			}
		},

		goCart: function(res) {
			// 去购物车
			this.$router.push({
				name: 'shoppingCart'
			});
		},

		goAllevaluate: function() {
			// 去全部评价
			session.Lstorage.setItem('goodsid', this.shopId);
			this.$router.push({
				name: 'allEvaluate'
			});
		},
		goIndex: function() {
			// 回首页
			this.$router.replace({
				name: 'index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityDetail.scss';
@import '@/assets/css/Index.scss';
</style>
