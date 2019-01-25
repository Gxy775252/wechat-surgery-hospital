<!-- 商品详情 -->
<template>
	<div class="all">
		<div class="header">
			<div class="swiper">
				<div>
					<wv-swipe :autoplay="4000" class="swiperImg" v-if="isId!=1">
						<wv-swipe-item v-for="(item, key, index) in swipeContent" :key="key">
							<img :src="item.cover ? item.cover : ImgNull" class="imgA" />
							<div v-if="item.isVideo==1" class="playImg" @click.stop="isIdFun(item.url)">
								<img src="@/assets/images/icon/playImg.png" />
							</div>
						</wv-swipe-item>
					</wv-swipe>
					<Samll-Video class="swiperImg" @surt="surt" v-if="isId==1" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
				</div>
			</div>
		</div>
		<div class="text">
			<p>{{ goodsinfo.name }}</p>
			<p>{{ goodsinfo.brief }}</p>
			<p>￥ {{ goodsinfo.price }}</p>
		</div>
		<div class="selector">
			<div class="selectorDiv" @click="seeSize">
				<p>请选择规格</p>
				<div><img src="@/assets/images/icon/horn.png" /></div>
			</div>
			<div class="selectorDiv" @click="seeParameter">
				<p>参数</p>
				<div><img src="@/assets/images/icon/horn.png" /></div>
			</div>
		</div>
		<div>
			<div class="diary">
				<div class="diaryLeft">
					<img src="@/assets/images/icon/level.jpg" />
					<p>评价（{{ comments }}）</p>
				</div>
			</div>
			<div class="evaluate" v-for="(item, key, index) in listCommentsInfo" :key="key">
				<div class="evalTop">
					<div class="topInfor">
						<div><img :src="item.headimg || ImgNull" /></div>
						<div class="CDsecod">
							<p>{{ item.vipName }}</p>
							<p>{{ item.createTime }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规格：{{item.sizeName}}</p>
						</div>
					</div>
					<div class="topStars">
						<div v-for="(item, key, index) in item.stars" :key="key">
							<img src="@/assets/images/icon/smallStars.png" />
						</div>
					</div>
				</div>
				<div class="evaluateContent">
					<p>{{ item.comment }}</p>
				</div>
				<div class="evaluateSee" @click="goAllevaluate()">
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
				<div class="recommendContent" v-for="(item, key, index) in listRelative" :key="key" v-if="item != null" @click="goCommodityDetail(item.id)">
					<div class="rcImg">
						<img :src="item.coverResource.cover || ImgNull" />
					</div>
					<p class="rcTitle">{{ item.name }}</p>
					<p class="rcBrief">{{ item.brief }}</p>
					<p class="rcPrice">￥ {{ item.price }}</p>
				</div>

				<div style="width:1rem;"></div>
			</div>
		</div>
		<div class="bottomOperation">
			<div class="leftOperation">
				<div @click="goIndex()">
					<div class="imgA"><img src="@/assets/images/icon/returnIndex.png" /></div>
					<p>首页</p>
				</div>
				<div @click="collection(goodsinfo.id)">
					<div class="imgA">
						<img src="@/assets/images/icon/collection.png" v-show="ifCollection == 0" />
						<img src="@/assets/images/icon/collectionGray.png" v-show="ifCollection == 1" />
					</div>
					<p>收藏</p>
				</div>
			</div>
			<div class="centerOperation" @click="openaddSize()">加入购物车</div>
			<div class="rightOperation" @click="openbuySize()">立即购买</div>
		</div>
		<div class="cart" @click="goCart">
			<p v-if="cartNum > 0">{{ cartNum }}</p>
			<img src="@/assets/images/icon/cart.png" />
		</div>
		<div class="seeI"><img src="@/assets/images/icon/kanjian.png" /></div>
		<div style="height: 3rem;"></div>
		<!-- 加入购物车规格弹层内容 -->
		<div class="selectModel" v-if="addSizeHidden">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left"><img :src="swipeContent[0].cover || ImgNull" /></div>
					<div class="modelTop-center">
						<p>￥ {{ goodsinfo.price }}</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close" @click="close()">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p v-for="(item, key, index) in listSizeInfo" :key="key" :class="sizeId == item.id ? 'colorA' : ''" @click="selectSize(item)">
							{{ item.name }}
						</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>{{ storage >= 1 ? '有' : '无' }}</p>
				</div>
				<div class="sum">
					<p>购买数量</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(num)" :disabled="storage >= 1 ? false : true">
								-
							</button>
							<p>{{ num }}</p>
							<button @click="plus(num)" :disabled="storage >= 1 ? false : true">
								+
							</button>
						</div>
					</div>
				</div>
				<button class="success" @click="addToCart()" :disabled="disabled" v-if="storage >= 1">
					确定
				</button>
				<button class="error" v-else>该商品无货</button>
			</div>
		</div>
		<!-- 加入购物车或立即购买规格弹层内容 END-->
		<!-- 加入购物车规格弹层内容 -->
		<div class="selectModel" v-if="buySizeHidden">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left"><img :src="swipeContent[0].cover || ImgNull" /></div>
					<div class="modelTop-center">
						<p>￥ {{ goodsinfo.price }}</p>
						<!-- 待修改 不同规格不同价格 -->
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close" @click="close()">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p v-for="(item, key, index) in listSizeInfo" :key="key" :class="sizeId == item.id ? 'colorA' : ''" @click="selectSize(item)">
							{{ item.name }}
						</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>{{ storage >= 1 ? '有' : '无' }}</p>
				</div>
				<div class="sum">
					<p>购买数量</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(num)" :disabled="storage >= 1 ? false : true">
								-
							</button>
							<p>{{ num }}</p>
							<button @click="plus(num)" :disabled="storage >= 1 ? false : true">
								+
							</button>
						</div>
					</div>
				</div>
				<button class="success" @click="immediatePurchase()" :disabled="disabled" v-if="storage >= 1">
					确定
				</button>
				<button class="error" v-else>该商品无货</button>
			</div>
		</div>
		<!-- 加入购物车或立即购买规格弹层内容 END-->
		<!-- 选择规格 -->
		<div class="selectModel" v-if="sizeHidden">
			<div class="modelInside">
				<div class="modelTop">
					<div class="modelTop-left"><img :src="swipeContent[0].cover || ImgNull" /></div>
					<div class="modelTop-center">
						<p>￥ {{ goodsinfo.price }}</p>
						<p>请选择规格</p>
					</div>
					<div class="modelTop-close" @click="close()">
						<img src="@/assets/images/icon/guanbi.png" />
					</div>
				</div>
				<div class="size">
					<p>规格</p>
					<div class="size-Select">
						<p v-for="(item, key, index) in listSizeInfo" :key="key" :class="sizeId == item.id ? 'colorA' : ''" @click="selectSize(item)">
							{{ item.name }}
						</p>
					</div>
				</div>
				<div class="stock">
					<p>库存</p>
					<p>{{ storage >= 1 ? '有' : '无' }}</p>
				</div>
				<div class="sum">
					<p>购买数量</p>
					<div class="buttonMoney">
						<div>
							<button @click="reduce(num)" :disabled="storage >= 1 ? false : true">
								-
							</button>
							<p>{{ num }}</p>
							<button @click="plus(num)" :disabled="storage >= 1 ? false : true">
								+
							</button>
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
		<!-- 产品参数 -->
		<div class="selectModel" v-if='ifListProp'>
			<div class="modelInside">
				<div class="titleTopA">产品参数</div>
				<div class='titleList' v-for="(item,key,index) in listProp" :key='key'>
					<p class='listPA'>{{item.prop}}</p>
					<p class='listPB'>{{item.descript}}</p>
				</div>
				<div style="height:4rem;"></div>
				<div class="bottomA">
					<button class="success" @click='successColse'>确定</button>
				</div>
			</div>
		</div>
		<!-- 产品参数 END-->
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Swipe,
		SwipeItem,
		Toast
	} from 'we-vue';
	Vue.use(Swipe).use(SwipeItem);
	import * as api from '@/assets/js/api';
	import * as session from '@/assets/js/session';
	import SamllVideo from '@/components/samllVideoPlay.vue';

	export default {
		name: 'commodityDetail',
		data() {
			return {
				shopId: 0, //商品id
				swipeContent: '', //轮播
				listSizeInfo: '', //规格中的尺码
				listCommentsInfo: '', //评论列表
				listRelative: '', //关联商品
				listProp: '', //商品属性
				goodsinfo: '', //商品内容
				ifCollection: '', //是否收藏
				comments: '', //评论数量
				num: 1, //默认为0
				addSizeHidden: false, //点击加入购物车
				buySizeHidden: false, //点击立即购买
				sizeHidden: false, //点击规格显示的弹层
				storage: 0, //库存
				cartNum: 0, //加入购物车数量
				sizeId: 0, //选择规格id
				disabled: false, //按钮能否点击
				ifListProp: false, //是否显示产品参数内容
				ImgNull: this.$store.state.ImgNull,
				pubicFunction: '',
				videoUrl: '',
				isId: 0,
				aspectRatio: '13:9',
			};
		},
		components: {
			'Samll-Video': SamllVideo
		},
		created: function() {
			let that = this;
			that.$store.commit('showBottomNav', {
				isShow: false
			});
			that.shopId = session.Lstorage.getItem('shopId');
			// 商品详情
			that.pubicFunction = function(id) {
				api.getCommodityDetail({
					data: {
						openid: that.$store.state.uid,
						id: id
					}
				}).then(res => {
					res.data.listBanner = [{
							id: 1,
							isVideo: "0",
							cover: "http://tcjh.suitang1973.com/pic/cover1.jpg",
							url: "http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4",
							sourceid: '1',
							redirectType: '0',
							//0医生 1仪器 2商品 3项目
						},
						{
							id: 2,
							isVideo: "1",
							cover: "http://tcjh.suitang1973.com/pic/cover1.jpg",
							url: "http://img.tukuppt.com/video_show/2269348/00/02/23/5b52ff923e41e.mp4",
							sourceid: '1',
							redirectType: '0',
						},
					]
					if (res.data.flag) {
						console.log('商城详情内容', res.data);
						that.comments = res.data.comments; //评论数量
						that.ifCollection = res.data.favored; //是否收藏
						that.swipeContent = res.data.listBanner; //轮播
						that.listSizeInfo = res.data.listSize; //规格中的尺码
						that.listCommentsInfo = res.data.listComments; //评论列表
						that.goodsinfo = res.data.goods; //商品内容
						that.listRelative = res.data.listRelative; //关联商品
						that.listProp = res.data.listProp; //商品属性
						// 待修改 评价总数 相关推荐 尺码库存（都是缺少数据）
					} else {
						Toast.text({
							duration: 1000,
							message: res.data.msg
						});
					}
				})
			};
			that.pubicFunction(that.shopId);

		},
		methods: {
			goCommodityDetail: function(res) {
				//跳转到商品详情
				this.pubicFunction(res);
			},

			seeParameter: function() {
				// 打开参数内容
				this.ifListProp = true;
			},
			successColse: function() {
				// 关闭参数内容
				this.ifListProp = false;
			},

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
				this.storage = 0;
				this.addSizeHidden = false;
				this.buySizeHidden = false;
				this.disabled = false;
			},

			selectSize: function(res) {
				//选择规格
				this.sizeId = res.id;
				this.storage = res.stocks;
				if (res.stocks < 1) {
					this.num = 1;
				}
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
				this.disabled = true;
				api.addCart({
					data: {
						openid: this.$store.state.uid,
						goodsid: this.shopId,
						sizeid: this.sizeId,
						count: this.num
					}
				}).then(res => {
					if (res.data.flag) {
						this.addSizeHidden = false;
						Toast.text({
							duration: 1000,
							message: '已加入购物车'
						});
						this.cartNum += 1;
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
				this.disabled = true;
				api.submitGoodsOrder({
					data: {
						openid: this.$store.state.uid,
						fromCart: 0,
						goodsid: this.shopId,
						sizeid: this.sizeId,
						number: this.num,
						cartidList: ''
					}
				}).then(res => {
					if (res.data.flag) {
						this.$store.state.perpay_id = null;
						this.buySizeHidden = false;
						session.Lstorage.setItem('orderId', res.data.orderid);
						this.$router.push({
							name: 'placeOrder'
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
							openid: this.$store.state.uid,
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
							openid: this.$store.state.uid,
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
			},
			isIdFun: function(e) {
				this.isId = 1;
				this.videoUrl = e
			},
			surt: function(e) {
				this.isId = e
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/css/commodityDetail.scss';
	@import '@/assets/css/Index.scss';

	.header {
		padding: 0.93rem 0;
		background: #fff;
		padding-bottom: 0;
	}
</style>
