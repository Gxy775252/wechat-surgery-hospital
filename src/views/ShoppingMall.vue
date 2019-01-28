<!-- 商城首页 -->
<template>
<div style="background: #FFFFFF;padding-top:calc(2.4rem / 2);">
  <div class="mallTop">
    <div class="mallCenter">
      <div class="mallImg">
        <img src="@/assets/images/icon/search.png" />
      </div>
      <p>搜索商品</p>
    </div>
  </div>
  <div class="navList">
    <p @click="select_P(0)">全部</p>
    <p v-for="item in listClassifyInfo" :key="item.id" @click="select_P(item.id)">{{item.name}}</p>
    <p style="width:0.1px;"></p>
  </div>
  <div class="swiper">
    <div>
      <wv-swipe :autoplay="4000" class="swiperImg">
        <wv-swipe-item v-for="(item, key, index) in listBannerInfo" :key="key">
          <img :src="item.cover || ImgNull" class="imgA" />
          <div v-if="item.isVideo==1" class="playImg">
            <img src="@/assets/images/icon/playImg.png" />
          </div>
        </wv-swipe-item>
      </wv-swipe>
    </div>
  </div>
  <div class="centerImg">
    <div class="left" @click="goCommodityDetail(imgA.goodsid)">
      <img :src="imgA || ImgNull" />
    </div>
    <div class="right">
      <div class="top" @click="goCommodityDetail(imgB.goodsid)">
        <img :src="imgB || ImgNull" />
      </div>
      <div class="bottom">
        <div @click="goCommodityDetail(imgC.goodsid)">
          <img :src="imgC || ImgNull" />
        </div>
        <div @click="goCommodityDetail(imgD.goodsid)">
          <img :src="imgD || ImgNull" />
        </div>
      </div>
    </div>
  </div>
  <div class="diary">
    <div class="diaryLeft">
      <img src="@/assets/images/icon/level.jpg" />
      <p>热销商品</p>
    </div>
  </div>
  <div class="list">
    <div class="listText" v-for="(item,key,index) in listHotInfo" :key="key">
      <div class="listImg" v-if="isId!=item.id">
        <img :src="item.resource.cover || ImgNull" @click="goCommodityDetail(item.id)" />
        <div v-if="item.resource.isVideo==1 " class="playImg" @click.stop="isIdFun(item.resource.url,item.id)">
          <img src="@/assets/images/icon/playImg.png" />
        </div>
      </div>
      <Samll-Video class="listImg" @surt="surt" v-if="isId==item.id" :videoUrl="videoUrl" :aspectRatio="aspectRatio"></Samll-Video>
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
    <img src="@/assets/images/icon/kanjian.png" />
  </div>
  <div class="divHeight"></div>
</div>
</template>

<script>
import Vue from 'vue';
import {
  Swipe,
  SwipeItem,
  Toast
} from 'we-vue';
import * as api from '@/assets/js/api';
Vue.use(Swipe).use(SwipeItem);
import * as session from '@/assets/js/session';
import SamllVideo from '@/components/samllVideoPlay.vue';
export default {
  name: 'shoppingMall',
  data() {
    return {
      listBannerInfo: '', //轮播
      listClassifyInfo: '', //分类列表
      listHotInfo: '', //热门商品
      imgA: '',
      imgB: '',
      imgC: '',
      imgD: '',
      selectId: 0, //分类选中 0=全部
      ImgNull: this.$store.state.ImgNull,
      videoUrl: '',
      isId: 0,
      aspectRatio: '16:9',
    };
  },
  components: {
    'Samll-Video': SamllVideo
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: true
    });
  },
  mounted: function() {
    api.getShoppingMall({
      data: {
        openid: this.$store.state.uid,
        classifyid: 0 //0，表示全部
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('商城首页内容', res.data);
        this.listBannerInfo = res.data.listBanner; //轮播内容
        this.listClassifyInfo = res.data.listClassify; //分类列表
        this.listHotInfo = res.data.listHot; //热门商品
        this.imgA = res.data.topProduct1; //图片一
        this.imgB = res.data.topProduct2; //图片一
        this.imgC = res.data.topProduct3; //图片一
        this.imgD = res.data.topProduct4; //图片一
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
      session.Lstorage.setItem('shopId', res);
      this.$router.push({
        name: 'commodityList'
      });
    },
    goCommodityDetail: function(res) {
      // 跳转商品详情并将当前点击的商品id传入
      session.Lstorage.setItem('shopId', res);
      this.$router.push({
        name: 'commodityDetail'
      });
    },
    isIdFun: function(url, id) {
      this.isId = id;
      this.videoUrl = url
    },
    surt: function(e) {
      this.isId = e
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/shoppingMall.scss';
@import '@/assets/css/commodityList.scss';
@import '@/assets/css/Index.scss';
</style>
