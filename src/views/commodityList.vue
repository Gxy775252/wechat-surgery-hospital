<!-- 商品分类列表 -->
<template>
	<div>
		<div class="navList">
			<p @click="select_P(0)" :class="selectId == 0 ? 'selection' : ''">全部</p>
			<p
				v-for="item in listClassifyInfo"
				:key="item.id"
				:class="item.id == selectId ? 'selection' : ''"
				@click="select_P(item.id)"
			>
				{{ item.name }}
			</p>
			<p style="width: 0.5px;"></p>
		</div>
		<div class="orderBy">
			<div @click="clickByPrice()">
				<p :class="ascBy ? 'colorABC' : ''">价格排序</p>
				<img src="@/assets/images/icon/arrowUp.png" v-show="ascByPrice == 0" />
				<img src="@/assets/images/icon/arrowDown.png" v-show="ascByPrice == 1" />
			</div>
			<div @click="clickBySales()">
				<p :class="!ascBy ? 'colorABC' : ''">销量排序</p>
				<img src="@/assets/images/icon/arrowUp.png" v-show="ascBySales == 0" />
				<img src="@/assets/images/icon/arrowDown.png" v-show="ascBySales == 1" />
			</div>
			<div class="lastDiv"><img src="@/assets/images/icon/search.png" /></div>
		</div>
		<div class="AllList">
			<div class="listDiv" v-for="item in listGoodsInfo" :key="item.id">
				<div class="listImg"><img src="@/assets/images/example/doctor.png" /></div>
				<div class="listText">
					<p @click="goCommodityDetail(item.id)">{{ item.name }}</p>
					<p @click="goCommodityDetail(item.id)">{{ item.brief }}</p>
					<div class="ListPrice">
						<p @click="goCommodityDetail(item.id)">￥ {{ item.price }}</p>
						<div><img src="@/assets/images/icon/joinCart.png" /></div>
					</div>
				</div>
			</div>
			<div style="clear:both;"></div>
		</div>
		<div class="cart" @click="goCart"><img src="@/assets/images/icon/cart.png" /></div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
import { Toast } from 'we-vue';
export default {
	name: 'commodityList',
	data() {
		return {
			selectId: 0, //分类选中 0=全部
			ascByPrice: 0, //1=价格升序
			ascBySales: 0, //销量升序
			ascBy: true, //x选中那个
			listClassifyInfo: '', //分类
			listGoodsInfo: '' //商品列表
		};
	},
	created: function() {
		this.$store.commit('showBottomNav', {
			isShow: false
		});
		this.selectId = session.Lstorage.getItem('shopId') || 0;
		api.getCommodityList({
			data: {
				openid: this.$store.state.uid,
				classifyid: this.selectId, //0，表示全部
				desc: this.ascByPrice //价格排序
			}
		}).then(res => {
			if (res.data.flag) {
				console.log('商城首页内容', res.data);
				this.listClassifyInfo = res.data.listClassify; //分类列表
				this.listGoodsInfo = res.data.listGoods; //商品列表
			} else {
				Toast.text({
					duration: 1000,
					message: res.data.msg
				});
			}
		});
	},
	methods: {
		select_P: function(res) {
			// 跳转商品列表并将当前点击的分类id传入
			this.selectId = res;
			let data = {};
			if (this.ascBy) {
				data = {
					openid: this.$store.state.uid,
					classifyid: this.selectId, //0，表示全部
					desc: this.ascByPrice //价格排序
				};
			} else {
				data = {
					openid: this.$store.state.uid,
					classifyid: this.selectId, //0，表示全部
					sortBySales: this.ascBySales //销量排序
				};
			}
			api.getCommodityDetail({
				data: data
			}).then(res => {
				if (res.data.flag) {
					console.log('商城首页内容', res.data);
					this.listClassifyInfo = res.data.listClassify; //分类列表
					this.listGoodsInfo = res.data.listGoods; //商品列表
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		clickByPrice: function() {
			// 价格筛选功能
			this.ascBy = true;
			if (this.ascByPrice == 1) {
				this.ascByPrice = 0;
			} else if (this.ascByPrice == 0) {
				this.ascByPrice = 1;
			}
			let data = {};
			if (this.ascBy) {
				data = {
					openid: this.$store.state.uid,
					classifyid: this.selectId, //0，表示全部
					desc: this.ascByPrice //价格排序
				};
			} else {
				data = {
					openid: this.$store.state.uid,
					classifyid: this.selectId, //0，表示全部
					sortBySales: this.ascBySales //销量排序
				};
			}
			api.getCommodityList({
				data: data
			}).then(res => {
				if (res.data.flag) {
					console.log('商城首页内容', res.data);
					this.listClassifyInfo = res.data.listClassify; //分类列表
					this.listGoodsInfo = res.data.listGoods; //商品列表
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		clickBySales: function() {
			// 销量筛选功能
			this.ascBy = false;
			if (this.ascBySales == 1) {
				this.ascBySales = -1;
			} else if (this.ascBySales == -1) {
				this.ascBySales = 1;
			}
			let data = {};
			if (this.ascBy) {
				data = {
					openid: this.$store.state.uid,
					classifyid: this.selectId, //0，表示全部
					desc: this.ascByPrice //价格排序
				};
			} else {
				data = {
					openid: this.$store.state.uid,
					classifyid: this.selectId, //0，表示全部
					sortBySales: this.ascBySales //销量排序
				};
			}
			api.getCommodityDetail({
				data: data
			}).then(res => {
				if (res.data.flag) {
					console.log('商城首页内容', res.data);
					this.listClassifyInfo = res.data.listClassify; //分类列表
					this.listGoodsInfo = res.data.listGoods; //商品列表
				} else {
					Toast.text({
						duration: 1000,
						message: res.data.msg
					});
				}
			});
		},
		goCommodityDetail: function(res) {
			//跳转到商品详情
			session.Lstorage.setItem('shopId', res);
			this.$router.push({
				name: 'commodityDetail'
			});
		},
		goCart: function(res) {
			// 去购物车
			this.$router.push({
				name: 'shoppingCart'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityList.scss';
</style>
