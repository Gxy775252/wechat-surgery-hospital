import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'index',
			component: () => import('./views/Index.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医美'
				next()
			}
		}, {
			path: '/reserve',
			name: 'reserve',
			component: () => import('./views/Reserve.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '预约'
				next()
			}
		},
		{
			path: '/reserveDetail',
			name: 'reserveDetail',
			component: () => import('./views/reserveDetail.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '预约详情'
				next()
			}
		},
		{
			path: '/shoppingMall',
			name: 'shoppingMall',
			component: () => import('./views/ShoppingMall.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '商城首页'
				next()
			}
		},
		{
			path: '/commodityList',
			name: 'commodityList',
			component: () => import('./views/commodityList.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '商品列表'
				next()
			}
		},
		{
			path: '/commodityDetail',
			name: 'commodityDetail',
			component: () => import('./views/commodityDetail.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '商品详情'
				next()
			}
		},
		{
			path: '/shoppingCart',
			name: 'shoppingCart',
			component: () => import('./views/shoppingCart.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '购物车'
				next()
			}
		}, {
			path: '/mine',
			name: 'mine',
			component: () => import('./views/Mine.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的'
				next()
			}
		},
		{
			path: '/mineInfo',
			name: 'mineInfo',
			component: () => import('./views/mineInfo.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的信息'
				next()
			}
		},
		{
			path: '/mineDiary',
			name: 'mineDiary',
			component: () => import('./views/mineDiary.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的美丽日记'
				next()
			}
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('./views/Register.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '注册'
				next()
			}
		},
		{
			path: '/doctorList',
			name: 'doctorList',
			component: () => import('./views/doctorList.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医生列表'
				next()
			}
		}, {
			path: '/docInfo',
			name: 'docInfo',
			component: () => import('./views/DocInfo.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医生详情'
				next()
			}
		}, {
			path: '/doctorCase',
			name: 'doctorCase',
			component: () => import('./views/doctorCase.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医生案例'
				next()
			}
		}, {
			path: '/instrumentList',
			name: 'instrumentList',
			component: () => import('./views/instrumentList.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '仪器列表'
				next()
			}
		},
		{
			path: '/beautifulDiary',
			name: 'beautifulDiary',
			component: () => import('./views/beautifulDiary.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '美丽日记'
				next()
			}
		}, {
			path: '/diaryDetails',
			name: 'diaryDetails',
			component: () => import('./views/diaryDetails.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '美丽日记详情'
				next()
			}
		},
		{
			path: '/newAddress',
			name: 'newAddress',
			component: () => import('./views/newAddress.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '编辑收货地址'
				next()
			}
		},
		{
			path: '/selectAddress',
			name: 'selectAddress',
			component: () => import('./views/selectAddress.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '选择收货地址'
				next()
			}
		},
		{
			path: '/placeOrder',
			name: 'placeOrder',
			component: () => import('./views/placeOrder.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '提交订单'
				next()
			}
		},
		{
			path: '/successfulPayment',
			name: 'successfulPayment',
			component: () => import('./views/successfulPayment.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '付款成功'
				next()
			}
		},
		{
			path: '/successReserve',
			name: 'successReserve',
			component: () => import('./views/successReserve.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '预订成功'
				next()
			}
		},
		{
			path: '/investigation',
			name: 'investigation',
			component: () => import('./views/investigation.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '满意度调查'
				next()
			}
		},
		{
			path: '/skinAnalysis',
			name: 'skinAnalysis',
			component: () => import('./views/skinAnalysis.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '皮肤分析'
				next()
			}
		},
	]
})
