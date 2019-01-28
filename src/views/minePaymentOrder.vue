<template>
<div class="all">
  <div class="top" v-if="orderInfo.status==0">
    <div class="top-left">
      <p>待支付</p>
      <p></p>
    </div>
    <div class="top-right">
      <img src="../assets/images/icon/daizhifu.png" />
    </div>
  </div>
  <div class="top" v-if="(orderInfo.showStatus=='待发货' || orderInfo.showStatus=='已申请退货')&&orderInfo.status==1">
    <div class="top-left">
      <p>待发货</p>
      <p>您的快递正在仓库等待快递小哥，请耐心等待</p>
    </div>
    <div class="top-right" style='width:calc(6.8rem/2);height:calc(5.73rem/2);'>
      <img src="../assets/images/icon/daifahuo.png" />
    </div>
  </div>
  <div class="top" v-if="orderInfo.showStatus=='待收货'">
    <div class="top-left">
      <p>待收货</p>
      <p>您的宝贝已经在路上向您飞奔过来</p>
    </div>
    <div class="top-right" style='width:calc(6.8rem/2);height:calc(5.73rem/2);'>
      <img src="../assets/images/icon/daishouhuo.png" />
    </div>
  </div>

  <div class="dizhi" style='height:calc(11.33rem/2);'>
    <div>
      <p>收件人：{{orderInfo.postName}}</p>
      <p>电话：{{orderInfo.postPhone}}</p>
    </div>
    <p>地址：{{orderInfo.postAddress}}</p>
  </div>
  <div class="dizhi" @click='seeWuLiu(orderInfo.id)' v-if='orderInfo.status==1 && (orderInfo.showStatus=="已申请退货" || orderInfo.showStatus=="待发货" ||orderInfo.showStatus=="待收货")'>
    <div>
      <p>您的快递已发货，点击查看</p>
      <p></p>
    </div>
  </div>
  <div class="center" v-for="(item,key,index) in listDetailInfo" :key='key'>
    <div class="center-left">
      <div class="leftImg">
        <img :src="item.coverResource!=null?item.coverResource.cover:ImgNull" />
      </div>
      <div class="leftText">
        <p>{{item.goodsName}}</p>
        <p>规格：{{item.sizeName}}</p>
      </div>
    </div>
    <div class="center-right">
      <p>￥ {{item.price}}</p>
      <p>x{{item.number}}</p>
    </div>
  </div>
  <div class="info">
    <p>订单信息</p>
    <div class="info-con">
      <p>商品金额</p>
      <p>￥ {{orderInfo.money}}</p>
    </div>
    <div class="info-con">
      <p>积分抵扣</p>
      <p>￥ {{orderInfo.score}}</p>
    </div>
    <div class="info-con" style="margin-top:20px;">
      <p>订单编号</p>
      <p>{{orderInfo.kdNo}}</p>
    </div>
    <div class="info-con">
      <p>提交时间</p>
      <p>{{orderInfo.createTime}}</p>
    </div>
  </div>
  <div class="seeI">
    <img src="@/assets/images/icon/kanjian.png" />
  </div>
  <div class="divHeight"></div>
  <div class="bottomOperation" v-if="orderInfo.status==0">
    <div class="leftOperation">￥{{orderInfo.money}}</div>
    <div class="centerOperation" @click="closeOrder">取消订单</div>
    <div class="rightOperation" @click='fukuan(orderInfo.id)'>立即付款</div>
  </div>
  <div class="bottomOperation" v-if="orderInfo.status==1 && (orderInfo.logStatus!=3 || orderInfo.logStatus!=8)">
    <div class="leftOperation">￥{{orderInfo.money}}</div>
    <div class="centerOperation" @click='succHuo(orderInfo.id)'>确认收货</div>
    <div class="rightOperation" @click="returnGoods(orderInfo.id,orderInfo.money)">退货/退款</div>
  </div>
  <div class="bottomOperation" v-if="orderInfo.status==1 && orderInfo.refundStatus ==1">
    <div class="leftOperation">￥{{orderInfo.money}}</div>
    <div class="centerOperation" @click='funAA'>退货/退款</div>
    <div class="rightOperation" @click='succHuo(orderInfo.id)'>确认收货</div>
  </div>
  <div class="bottomOperation" v-if="orderInfo.status==1 && (orderInfo.logStatus==3 || orderInfo.logStatus==8) && orderInfo.canEva==1">
    <div class="leftOperation">￥{{orderInfo.money}}</div>
    <div class="centerOperation" style='background:#fff;'></div>
    <div class="rightOperation" @click='gocommod(orderInfo.id)'>评价</div>
  </div>
  <div>

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
  name: 'minePaymentOrder',
  inject: ['reload'],
  data() {
    return {
      ImgNull: this.$store.state.ImgNull,
      listDetailInfo: '',
      orderInfo: {},
      defaultProps1: {
        children: 'children',
        label: 'comName'
      },
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    api.getVipGoodsOrderDetail({
      data: {
        openid: this.$store.state.uid,
        orderid: this.$route.query.orderid,
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('商城订单', res.data);
        this.listDetailInfo = res.data.listDetail;
        this.orderInfo = res.data.order;
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
    seeWuLiu: function(res) {
      this.$router.push({
        name: 'mineViewLogistics',
        query: {
          wuLiuId: res
        }
      });
    },
    returnMoney: function(res, money) {
      // 退货退款
      session.Lstorage.setItem('returnMoney1', money);
      this.$router.push({
        name: 'returnGoodsChoice',
        query: {
          returnId: res
        }
      });
    },
    closeOrder: function() {
      //取消订单
      let that = this;
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
              orderid: this.$route.query.orderid
            }
          }).then(res => {
            if (res.data.flag) {
							that.$store.state.prepay_id = null;
              Toast.text({
                duration: 1000,
                message: '取消成功'
              });
							setTimeout(function(){
								history.go(-1);
							},1000)
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
    funAA: function() {
      Toast.text({
        duration: 1000,
        message: '已申请退货/退款'
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
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/minePaymentOrder.scss';
</style>
