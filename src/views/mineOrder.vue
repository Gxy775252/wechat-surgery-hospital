<!-- 商城订单列表 -->
<template>
<div class="all">
  <div class="navList">
    <div v-for='(item,key,index) in navList' :key='key' @click='clickNav(item.id)'>
      <p :class="item.id==navId?'nav-p1':''">{{item.name}}</p>
      <p :class="item.id==navId?'nav-p2':''"></p>
    </div>
  </div>
  <div class="conList" v-for='(item,key,index) in listOrderInfo' :key='key'>
    <div class="top">
      <p>订单编号：{{item.orderno}}</p>
      <p>{{item.showStatus}}</p>
    </div>
    <div class="center" v-for='(item2,key,index) in item.listDetail' :key='key' @click="goDetail(item.id)">
      <div class="center-left">
        <div class="leftImg">
          <img :src="item2.coverResource?item2.coverResource.cover:ImgNull" />
        </div>
        <div class="leftText">
          <p>{{item2.goodsName}}</p>
          <p>规格：{{item2.sizeName}}</p>
        </div>
      </div>
      <div class="center-right">
        <p>￥ {{item2.price}}</p>
        <p>x{{item2.number}}</p>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <p>已付金额：</p>
        <p>￥{{item.money}}</p>
      </div>
      <div class="bottom-right">
        <button class="color1" @click="cancel(item.id)" v-if='item.status==0'>取消订单</button>
        <button class="color2" v-if='item.status==0' @click='fukuan(item.id)'>立即付款</button>
        <button class="color1" @click="seeWuLiu(item.id)" v-if='item.status==1 && item.refundStatus==0'>查看物流</button>
        <button class="color2" @click="returnGoods(item.id,item.money)" v-if='item.status==1 && item.refundStatus==0'>退货/退款</button>
        <button class="color2" @click="succHuo(item.id)" v-if='item.status==1 && (item.logStatus==1 || item.logStatus==2)'>确认收货</button>
        <button class="color2" @click='gocommod(item.id)' v-if='item.canEva==1'>评价</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import {
  Toast,
  Dialog
} from 'we-vue';
import * as session from '@/assets/js/session';
export default {
  name: 'mineOrder',
  inject: ['reload'],
  data() {
    return {
      ImgNull: this.$store.state.ImgNull,
      listOrderInfo: '',
      defaultProps1: {
        children: 'children',
        label: 'comName'
      },
      navId: 0,
      navList: [{
        id: 0,
        name: '全部',
      }, {
        id: 1,
        name: '待支付',
      }, {
        id: 2,
        name: '待收货',
      }, {
        id: 3,
        name: '退货/退款',
      }, {
        id: 4,
        name: '未核销',
      }, ]
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });

  },
  mounted: function() {
    api.getVipGoodsOrderList({
      data: {
        openid: this.$store.state.uid,
        index: 0
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('商城订单', res.data);
        this.listOrderInfo = res.data.listOrder;
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    fukuan: function(res) {
      let that = this;
      // 付款
      api.repayGoodsOrder({
        data: {
          openid: this.$store.state.uid,
          orderid: res
        }
      }).then(res => {
        if (res.data.flag) {
          that.$router.push({
            name: 'payment',
            query: {
              payId: res.data.prepay_id
            }
          });
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },
    succHuo: function(res) {
      // 确认收货
      api.confirmReceipt({
        data: {
          openid: this.$store.state.uid,
          orderid: res
        }
      }).then(res => {
        console.log('是否取消了----', res);
        if (res.data.flag) {
          Toast.text({
            duration: 1000,
            message: '确认收货'
          });
          this.reload();
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },
    cancel: function(res) {
      console.log('取消啊啊啊-----', res);
      Dialog.confirm({
          title: '提示',
          message: '是否取消',
          skin: 'ios',
          showCancelButton: true
        })
        .then(() => {
          api.cancelGoodsOrder({
            data: {
              openid: this.$store.state.uid,
              orderid: res
            }
          }).then(res => {
            console.log('是否取消了----', res);
            if (res.data.flag) {
              Toast.text({
                duration: 1000,
                message: '取消成功'
              });
              this.reload();
            } else {
              Toast.text({
                duration: 1000,
                message: res.data.msg
              });
            }
          });
        })
        .catch(() => {});
    },
    returnGoods: function(res, money) {
      // 退货页面
      session.Lstorage.setItem('returnMoney1', money);
      this.$router.push({
        name: 'returnGoodsChoice',
        query: {
          returnId: res
        }
      });
    },
    goDetail: function(res) {
      this.$router.push({
        name: 'minePaymentOrder',
        query: {
          orderid: res
        },
      });
    },
    clickNav: function(res) {
      console.log(res);
      this.navId = res;
      api.getVipGoodsOrderList({
        data: {
          openid: this.$store.state.uid,
          index: res,
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('商城订单', res.data);
          this.listOrderInfo = res.data.listOrder;
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    },
    seeWuLiu: function(res) {
      this.$router.push({
        name: 'mineViewLogistics',
        query: {
          wuLiuId: res
        }
      });
    },
    gocommod: function(res) {
      console.log(res);
      this.$router.push({
        name: 'commodityEvaluation',
        query: {
          orderid: res
        },
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineOrder.scss';
</style>
