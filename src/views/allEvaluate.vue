<!-- 全部评价 -->
<template>
<div class="all">
  <div class="AllList">
    <div class="diary">
      <div class="diaryLeft">
        <img src="@/assets/images/icon/level.jpg" />
        <p>评价（{{ listCommentsInfo.length }}）</p>
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
      <div class="evaluateSee">
        <p>平台回复：{{ item.reply }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/assets/js/api';
import {
  Toast
} from 'we-vue';
import * as session from '@/assets/js/session';
export default {
  name: 'allEvaluate',
  data() {
    return {
      listCommentsInfo: '', //评论列表
      ImgNull: this.$store.state.ImgNull
    };
  },
  created: function() {
    this.$store.commit('showBottomNav', {
      isShow: false
    });
    this.shopId = session.Lstorage.getItem('goodsid');
    // 评论
    api.getAllComments({
      data: {
        openid: this.$store.state.uid,
        goodsid: this.shopId
      }
    }).then(res => {
      if (res.data.flag) {
        console.log('全部评价', res.data);
        this.listCommentsInfo = res.data.listComments;
        // 待修改 有个stars（星星）参数 不知道是数字还是什么暂未处理
      } else {
        Toast.text({
          duration: 1000,
          message: res.data.msg
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/allEvaluate.scss';
</style>
