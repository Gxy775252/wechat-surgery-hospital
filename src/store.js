import Vue from 'vue'
import Vuex from 'vuex'
// import * as util from 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		showBottomNav: true,
		shoppingImgNull: require('@/assets/images/icon/cartNull.png'),
		doctorImgNull: require('@/assets/images/example/doctor.png'),
	},
	getters: {},
	mutations: {
		showBottomNav(state, type) {
			state.showBottomNav = type.isShow
		}
	},
	actions: {

	}
})
