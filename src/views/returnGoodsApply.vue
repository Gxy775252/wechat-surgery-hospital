<!-- 退货页面 -->
<template>
<div class="all">
  <div class="list" v-if='prickA'>
    <p>货物状态</p>
    <div class="list-right" @click='prickGodds'>
      <input placeholder="选择货物状态" readonly unselectable="on" :value='prickCon1' class='spanInpiut' />
    </div>
  </div>
  <div class="list">
    <p>退货原因</p>
    <div class="list-right" @click='returnGodds'>
      <input placeholder="选择退货原因" readonly unselectable="on" :value='prickCon2' class='spanInpiut' />
    </div>
  </div>
  <div class="textarea">
    <p>问题描述</p>
    <div class="textarea-right">
      <wv-textarea placeholder="请输入文本" :rows="4" :max-length="50"></wv-textarea>
    </div>
  </div>
  <div class="list">
    <p>退款金额</p>
    <div class="list-right">
      <input type='number' :placeholder='returnMoney' readonly unselectable="on" class='inputPrice' />
    </div>
  </div>
  <div class="upload">
    <p>上传凭证</p>
    <div class="upload-img">
      <div>
        <img src="../assets/images/icon/upload.png" />
      </div>
    </div>
  </div>
  <div class="bottom">
    <button>提交</button>
  </div>

  <!-- 选择货物状态 -->
  <wv-picker :visible.sync="pickerShow1" :columns="fruitColumns1" value-key="name" @confirm="confirmPerson1" />
  <!-- 选择货物状态 END-->
  <!-- 选择退货原因 -->
  <wv-picker :visible.sync="pickerShow2" :columns="fruitColumns2" value-key="name" @confirm="confirmPerson2" />
  <!-- 选择退货原因 END-->
</div>
</template>

<script>
import Vue from 'vue';
import {
  Textarea,
  Toast,
  Picker
} from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
Vue.use(Textarea).use(Picker);
export default {
  name: 'returnGoodsApply',
  data() {
    return {
      returnMoney: '', //总金额
      prickA: false, //是否显示货物状态
      prickCon1: '', //货物状态
      pickerShow1: false, //货物状态
      fruitColumns1: [{
        values: [{
            id: 1,
            name: '已收到货',
          },
          {
            id: 2,
            name: '未收到货',
          },
        ]
      }],
      prickCon2: '', //退货原因
      pickerShow2: false, //退货原因
      fruitColumns2: [{
        values: [{
            id: 1,
            name: '拍错/不想要',
          },
          {
            id: 2,
            name: '快递一直未收到',
          },
          {
            id: 3,
            name: '空包裹/少货',
          },
          {
            id: 4,
            name: '其他',
          },
        ]
      }],
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });

// 待支付  调接口
  },
  mounted: function() {
    this.returnMoney = '￥' + session.Lstorage.getItem('returnMoney1');
    if (this.$route.query.refundOrderID == 1) {
      this.prickA = true;
    }
  },
  methods: {
    prickGodds: function() {
      this.pickerShow1 = true;
    },
    confirmPerson1: function(res) {
      this.prickCon1 = res.getValues()[0].name;
    },
    returnGodds: function() {
      this.pickerShow2 = true;
    },
    confirmPerson2: function(res) {
      this.prickCon2 = res.getValues()[0].name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/returnGoodsApply.scss';
</style>
