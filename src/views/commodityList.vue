<template>
	<div>
		<div class="navList" >
			<!-- class="selection" 选中时的样式 -->
			<p @click="select_P(0)" :class="selectId==0?'selection':''">全部</p>
			<p v-for="item in listClassifyInfo" :class="item.id==selectId?'selection':''" @click="select_P(item.id)">{{item.name}}</p>
		</div>
		<div class="orderBy">
			<div @click="clickByPrice()">
				<p>价格排序</p>
				<img src="@/assets/images/icon/arrowUp.png" v-show="ascByPrice==1"/>
				<img src="@/assets/images/icon/arrowDown.png"v-show="ascByPrice==-1"/>

			</div>
			<div @click="clickBySales()">
				<p>销量排序</p>
				<img src="@/assets/images/icon/arrowUp.png" v-show="ascBySales==1"/>
				<img src="@/assets/images/icon/arrowDown.png" v-show="ascBySales==-1"/>
			</div>
			<div class="lastDiv">
				<img src="@/assets/images/icon/search.png"/>
			</div>
		</div>
		<div class="AllList">
			<div class="listDiv" v-for="item in listGoodsInfo">
				<div class="listImg">
					<img src="@/assets/images/example/doctor.png" />
				</div>
				<div class="listText">
					<p @click="goCommodityDetail(item.id)">{{item.name}}</p>
					<p @click="goCommodityDetail(item.id)">{{item.brief}}</p>
					<div class="ListPrice">
						<p @click="goCommodityDetail(item.id)">￥ {{item.price}}</p>
						<div>
							<img src="@/assets/images/icon/joinCart.png" />
						</div>
					</div>
				</div>
			</div>
			<div style="clear:both;"></div>
		</div>
		<div class="cart">
			<img src="@/assets/images/icon/cart.png" />
		</div>
		<div style="height:90px;"></div>
	</div>
</template>

<script>
import * as api from '@/assets/js/api';
export default {
    data() {
        return {
            selectId: 0, //分类选中 0=全部
            ascByPrice: 1, //1=价格升序
            ascBySales: 1, //销量升序
            listClassifyInfo: '', //分类
            listGoodsInfo: '' //商品列表
        };
    },
    created: function() {
        this.$store.commit('showBottomNav', {
            isShow: false
        });
        this.selectId = this.$route.params.shopId || 0;
        api.getCommodityList({
            data: {
                openid: this.globalData.openid,
                classifyid: this.selectId, //0，表示全部
                ascByPrice: this.ascByPrice, //价格排序
                ascBySales: this.ascBySales //销量排序
            }
        }).then(res => {
            if (res.data.flag) {
                console.log('商城首页内容', res.data);
                this.listClassifyInfo = res.data.listClassify; //分类列表
                this.listGoodsInfo = res.data.listGoods; //商品列表
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
            this.selectId = res;
            api.getCommodityDetail({
                data: {
                    openid: this.globalData.openid,
                    classifyid: res, //0，表示全部
                    ascByPrice: this.ascByPrice, //价格排序
                    ascBySales: this.ascBySales //销量排序
                }
            }).then(res => {
                if (res.data.flag) {
                    console.log('商城首页内容', res.data);
                    this.listClassifyInfo = res.data.listClassify; //分类列表
                    this.listGoodsInfo = res.data.listGoods; //商品列表
                } else {
                    Toast.text({
                        duration: 1000,
                        message: '请求失败'
                    });
                }
            });
        },
        clickByPrice: function() {
            // 价格筛选功能
            console.log(this.ascByPrice);
            if (this.ascByPrice == 1) {
                this.ascByPrice = -1;
            } else if (this.ascByPrice == -1) {
                this.ascByPrice = 1;
            }
            api.getCommodityList({
                data: {
                    openid: this.globalData.openid,
                    classifyid: this.selectId, //0，表示全部
                    ascByPrice: this.ascByPrice, //价格排序
                    ascBySales: this.ascBySales //销量排序
                }
            }).then(res => {
                if (res.data.flag) {
                    console.log('商城首页内容', res.data);
                    this.listClassifyInfo = res.data.listClassify; //分类列表
                    this.listGoodsInfo = res.data.listGoods; //商品列表
                } else {
                    Toast.text({
                        duration: 1000,
                        message: '请求失败'
                    });
                }
            });
        },
        clickBySales: function() {
            // 销量筛选功能
            console.log(this.ascBySales);
            if (this.ascBySales == 1) {
                this.ascBySales = -1;
            } else if (this.ascBySales == -1) {
                this.ascBySales = 1;
            }
            api.getCommodityDetail({
                data: {
                    openid: this.globalData.openid,
                    classifyid: this.selectId, //0，表示全部
                    ascByPrice: this.ascByPrice, //价格排序
                    ascBySales: this.ascBySales //销量排序
                }
            }).then(res => {
                if (res.data.flag) {
                    console.log('商城首页内容', res.data);
                    this.listClassifyInfo = res.data.listClassify; //分类列表
                    this.listGoodsInfo = res.data.listGoods; //商品列表
                } else {
                    Toast.text({
                        duration: 1000,
                        message: '请求失败'
                    });
                }
            });
        },
		goCommodityDetail:function(res){
			//跳转到商品详情
			this.$router.push({ name: 'commodityDetail', params: { shopId: res } });
		}
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/commodityList.scss';
</style>
