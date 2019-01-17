import Vue from 'vue'
import Vuex from 'vuex'
// import * as util from 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		showBottomNav: true,
		ImgNull: require('@/assets/images/icon/cartNull.png'),
		doctorImgNull: require('@/assets/images/example/doctor.png'),
		uid: null || 'test',
		wechatInfo: null,
		toPath: null
	},
	getters: {},
	mutations: {
		showBottomNav(state, type) {
			state.showBottomNav = type.isShow
		},
		setWechatInfo(state, data){
			state.wechatInfo = data.wechatInfo
			state.uid = data.wechatInfo.openid
		},
		setToPath(state, data){
			state.toPath = data.path
		}
	},
	actions: {

	}
})
