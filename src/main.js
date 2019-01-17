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
import { parseUrl } from './assets/js/utils'
						console.log(this,"config----------------");
router.beforeEach((to, from, next) => {
  // document.title = to.meta.title		//修改各个页面的title
  var uid = store.state.uid		//获取uid
	console.log(to,'--------???')
	console.log(uid,'--------???uid')
	store.commit('setToPath', {
		path: to.fullPath
	})
  if (uid == null) {
		let code = parseUrl('code')
		console.log(code,'---------code')
		if(code != null){
			API.getUserWechatInfo({
				data: {
					code: code
				}
			}).then(res => {
				console.log(res,'-------------res success')
				if(res.data.flag){
					let { data } = res
					let wechatInfo = Object.assign({openid: data.openid}, {nickname: data.nickname}, {headimg: data.headimg})
					store.commit('setWechatInfo', {
						wechatInfo: wechatInfo
					})
					// next(to.fullPath)
					// window.location.href = `${window.location.href}${to.fullPath}`
					// setTimeout(() => {
					console.log(parseUrl('path'),'------path')
					next()
					// }, 2000)
				}
			})
		}else{
			console.log(window.location,'-------location')
			window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx347f2c6ff3c8a16d&redirect_uri=${window.location.origin}?path=aaa&response_type=code&scope=snsapi_userinfo#wechat_redirect`

			console.log('fail')
		}
  } else {
    next()
  }
	// next()

})

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
