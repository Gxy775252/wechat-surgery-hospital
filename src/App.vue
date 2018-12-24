<template>
  <div id="app">
    <router-view/>
    <Tabber v-if="$store.state.showBottomNav"></Tabber>
  </div>
</template>
<script type="text/javascript">
import Tabber from '@/components/Tabber';
export default {
    name: 'app',
    components: {
        Tabber
    },
    created: function() {
        // function aaa(){
        //   console.log('222')
        // }
    },
    mounted: function() {}
};
(function (docs, win) {
  var docEls = docs.documentElement,
  resizeEvts = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalcs = function () {
  //getBoundingClientRect()这个方法返回一个矩形对象
  window.rem = docEls.getBoundingClientRect().width/25;
  docEls.style.fontSize = window.rem + 'px';
};
  recalcs();
  if (!docs.addEventListener) return;
  win.addEventListener(resizeEvts, recalcs, false);
})(document, window);
// wx.config({
//    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
//    appId: '', // 必填，公众号的唯一标识
//    timestamp: , // 必填，生成签名的时间戳
//    nonceStr: '', // 必填，生成签名的随机串
//    signature: '',// 必填，签名
//    jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见微信官方文档
// })
</script>
<style lang="scss">
@import './assets/css/public.css';
</style>
