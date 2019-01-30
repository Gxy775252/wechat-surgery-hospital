<template>
<div class="all">
  <div class="newList" v-for='(item,key,index) in listInfo' :key='key'>
    <div class="newList-time">
      <p>{{item.yearMonth}}</p>
      <p>+{{item.monthInc}}积分</p>
    </div>
    <div class="newList-list" v-for='(item2,key,index) in item.listItem' :key='key'>
      <div class="head">
        <div class="headimg">
          <img :src="item2.registerHeadimg" />
        </div>
        <div class="headText">
          <p>{{item2.registerName}}</p>
          <p>{{item.yearMonth}}注册成功</p>
        </div>
      </div>
      <p>+{{item2.registerVipid}}积分</p>
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/assets/js/api';
export default {
  data() {
    return {
      publicFunction: '',
      listInfo: ''
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
  },
  mounted: function() {
    let that = this;
    that.publicfunction = function() {
      api.goVipShareList({
        data: {
          openid: this.$store.state.uid
        }
      }).then(res => {
        if (res.data.flag) {
          console.log('拉新页面', res.data);
          this.listInfo = res.data.list;
        } else {
          Toast.text({
            duration: 1000,
            message: res.data.msg
          });
        }
      });
    }
    that.publicfunction();
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mineNewPeople.scss';
</style>
