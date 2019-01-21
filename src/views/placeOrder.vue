<!-- 确认订单 -->
<template>
<div class="background">
  <div class="addbox" @click="goSelectAddress()">
    <div class="bigBox">
      <div class="addFont">
        <div>
          <p class="nameFont">收件人：{{addressInfo.postName}}</p>
          <p class="nameFont">电话：{{addressInfo.postPhone}}</p>
        </div>
        <p class="add">收件地址：{{addressInfo.postArea}}{{addressInfo.postAddress}}</p>
      </div>
    </div>
    <div class="buttonImg"><img src="../assets/images/icon/rightGray.png"></div>
  </div>
  <div class="comBox" v-for="(item,key,index) in listDetailInfo" :key='key'>
    <img :src="item.coverResource.cover || ImgNull" class="comImg">
    <div class="specName">
      <p class="comName">{{item.goodsName}}</p>
      <p class="spec">规格：{{item.sizeName}}</p>
      <div>
        <p class="money">￥{{item.price}}</p>
        <div class="number">x{{item.number || 1}}</div>
      </div>
    </div>
  </div>
  <div class="payBox">
    <div class="payFont">支付方式</div>
  </div>
  <div class="payName">
    <div class="payWeChat" v-for="item in dataPay" :key="item.id" @click="selectPay(item.id)">
      <div class="imgWeChat">
        <img :src="item.img" />
        <p>{{item.payFont}}</p>
      </div>
      <div class="selectImg">
        <img v-if="!item.isshow" src="../assets/images/icon/sele.png" />
        <img v-if="item.isshow" src="../assets/images/icon/select.png" />
      </div>
    </div>
  </div>
  <div class="integralBox">
    <div class="integralFont">
      <p class="uses">使用积分</p>
      <p class="numberInt">（{{scoreBalInfo}}积分共抵扣0000{{maxScoreInfo}}元）</p>
    </div>
    <img :src="shutOpent" @click="shutClick" />
  </div>
  <div class="bottomBox">
    <div class="bottomMoney">￥{{orderInfo.money}}</div>
    <div class="bottomPay" @click="submitMoney">去支付</div>
  </div>
</div>
</template>

<script>
import {
  Toast
} from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
import wx from 'weixin-js-sdk'

export default {
  name: 'placeOrder',
  data() {
    return {
      cashBalInfo: '', //现金金额
      scoreBalInfo: '', //积分余额
      maxScoreInfo: '', //最大抵扣积分
      orderInfo: '', //订单信息
      addressInfo: '', //默认地址信息
      listDetailInfo: '', //商品列表
      shutOpent: require('../assets/images/icon/shut.png'),
      shutOpentId: 1, //1=不使用积分2=使用积分
      dataPayId: 1, //1=微信支付2=余额支付
      dataPay: [{
          id: 1,
          img: require('../assets/images/icon/wechat.png'),
          payFont: '微信支付',
          isshow: true
        },
        {
          id: 2,
          img: require('../assets/images/icon/wallet.png'),
          payFont: '余额支付',
          isshow: false
        }
      ],
      ImgNull: this.$store.state.ImgNull
    };
  },
  created: function() {
    let _this = this
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    this.orderId = session.Lstorage.getItem('orderId');
    // function getConfig(){
    //   return new Promise((res, ret) => {
    //     api.getWechatConfig({
    //       data: {
    //         url: window.location.href.split('#')[0]
    //       }
    //     }).then(res => {
    //       console.log(res,'----------res')
    //     })
    //   })
    // }

    // 订单确认页面
    function initData(){
      api.getConfirmOrder({
        data: {
          openid: _this.$store.state.uid,
          orderid: _this.orderId
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('订单确认', res.data)
          _this.cashBalInfo = res.data.cashBal //现金金额
          _this.scoreBalInfo = res.data.scoreBal //积分余额
          _this.maxScoreInfo = res.data.maxScore //最大抵扣积分
          _this.orderInfo = res.data.order //订单信息
          _this.addressInfo = res.data.address //默认地址信息
          _this.listDetailInfo = res.data.listDetail //商品列表
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    }
    initData()
  },
  methods: {
    submitMoney: function() {
      let parmas = Object.assign({}, {openid: this.$store.state.uid}, {orderid: this.orderId}, {wxcash: this.dataPayId == 1 ? this.orderInfo.money : '' }, {score: this.shutOpentId != 1 ? this.scoreBalInfo : ''}, {vipcash: this.dataPayId == 2 ? this.cashBalInfo : ''}, {postName: this.addressInfo.postName}, {postPhone: this.addressInfo.postPhone}, {postAddress: this.addressInfo.postAddress})
      // 待修改  支付不知道是那个接口
      // if (typeof WeixinJSBridge == "undefined") { // 判断是否在微信浏览器内
      //     if (document.addEventListener) {
      //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      //     } else if (document.attachEvent) {
      //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      //     }
      // } else {
      // laalla
      // }
      this.submitPay(parmas)
      console.log(this.dataPayId, '1=微信支付2=余额支付');
      console.log(this.shutOpentId, '1=不适用积分');
    },
    submitPay: function(parmas){
      api.getWechatPay({
        data: parmas
      }).then(res => {
        console.log(res,'-------res pay')
        if(res.data.flag){
          if(res.data.finished == 1){
            // vip 支付
          }else{
            // 跳转页面
          }
        }
      })
    },
    shutClick: function() {
      if (this.shutOpent == require('../assets/images/icon/shut.png')) {
        this.shutOpent = require('../assets/images/icon/open.png');
        this.shutOpentId = 2;
      } else {
        this.shutOpent = require('../assets/images/icon/shut.png');
        this.shutOpentId = 1;
      }
    },
    selectPay: function(id) {
      this.dataPayId = id;
      for (var i = 0; i < this.dataPay.length; i++) {
        if (id == this.dataPay[i].id) {
          this.dataPay[i].isshow = true;
        } else {
          this.dataPay[i].isshow = false;
        }
      }
    },
    goSelectAddress: function() {
      // 选择地址
      this.$router.push({
        name: 'selectAddress'
      });
    }
  }
};
</script>

<style scoped="scoped" lang="scss">
@import '@/assets/css/placeOrder.scss';
</style>
