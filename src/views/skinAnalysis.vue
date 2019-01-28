<template>
<div>
  <div class="topSelect">
    <div class="options" @click="prickPro()">
      <div class="listCon" :class="listConA">
        {{stores | pickerValueFilter}}
      </div>
      <div class="listImg">
        <img src="@/assets/images/icon/mineHore.png" />
      </div>
    </div>
  </div>
  <div class="case">
    <div class="caseBox">
      <div v-html="detailInfo.content1"></div>
    </div>
    <div class="zlImg">
      <img src="../assets/images/icon/zhiliao.png" />
    </div>
    <div class="caseBox" style="margin-top: 0;margin-bottom:1.66rem;">
      <div v-html="detailInfo.content2"></div>
    </div>
  </div>
  <div style="width:100%;background-color: #f7f7f7;height:calc(4.66rem/2);"></div>
  <div class="seeI">
    <img src="@/assets/images/icon/kanjian.png" />
  </div>
  <div class="divHeight"></div>
  <div class="bottom_btn">
    <button type="button" name="button" class="btnA" @click="goReserve">在线预约</button>
    <button type="button" name="button" class="btnB">在线咨询</button>
  </div>

  <!-- 选择肤质 -->
  <wv-picker :visible.sync="fruitPickerShow" :columns="fruitColumns" value-key="title" @confirm="confirmPerson" />
</div>
</template>

<script>
import Vue from 'vue';
import {
  Toast,
  Picker
} from 'we-vue';
import * as api from '@/assets/js/api';
import * as session from '@/assets/js/session';
Vue.use(Picker);
export default {
  data() {
    return {
      selectList: '',
      detailInfo: '',
      stores: [{
        title: '请选择'
      }], //您的肤质
      listConA: '', //改变颜色
      fruitPickerShow: false,
      fruitColumns: [{
        values: []
      }]
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    api.getQaList({
      data: {
        openid: this.$store.state.uid
      }
    }).then(res => {
      if (res.data.flag) {
        for (let i in res.data.listQa) {
          if (res.data.listQa[i].id == session.Lstorage.getItem('selectId')) {
            this.stores = res.data.listQa[i];
          }
        }
        this.fruitColumns[0].values = res.data.listQa; //下拉框
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
    api.getQaDetail({
      data: {
        openid: this.$store.state.uid,
        id: session.Lstorage.getItem('selectId')
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('数据内容', res.data);
        this.detailInfo = res.data.detail;
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  },
  methods: {
    goReserve: function() {
      console.log('点击了');
      this.$router.push({
        name: 'reserve',
      });
    },
    // 选择皮肤分析
    prickPro: function() {
      this.fruitPickerShow = true;
    },
    confirmPerson: function(picker) {
      this.stores = picker.getValues()[0];
      this.listConA = 'listConA';
      api.getQaDetail({
        data: {
          openid: this.$store.state.uid,
          id: session.Lstorage.getItem('selectId')
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('数据内容', res.data);
          this.detailInfo = res.data.detail;
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    }
  },
  filters: {
    pickerValueFilter(val) {
      if (val.constructor == Array) {
        return '请选择';
      } else {
        return val.title.toString();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/skinAnalysis.scss';
</style>
