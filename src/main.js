import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'we-vue/lib/style.css'
import {Tabbar,TabbarItem,Badge} from 'we-vue'
import config from './assets/js/config'
import 'babel-polyfill'
import wx from 'weixin-js-sdk'
import * as API from '@/assets/js/api'
import VideoPlayer from 'vue-video-player'

// API.postAPI({data: {
//   method: 'wechat_config',
//   url: window.location.href.split('#')[0]
// }}).then(res => {
//   console.log(res,'------res')
//   let { appId, nonceStr, signature, timestamp } = res.data.info
//   wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: appId, // 必填，公众号的唯一标识
//     timestamp: timestamp, // 必填，生成签名的时间戳
//     nonceStr: nonceStr, // 必填，生成签名的随机串
//     signature: signature,// 必填，签名
//     jsApiList: [] // 必填，需要使用的JS接口列表
//   });
// })
Vue.use(Tabbar).use(TabbarItem).use(Badge).use(config).use(wx).use(VideoPlayer);
Vue.config.productionTip = false
Vue.config.debug = true

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
