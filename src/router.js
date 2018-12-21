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
	}, {
		path: '/shoppingMall',
		name: 'shoppingMall',
		component: () => import('./views/ShoppingMall.vue'),
		beforeEnter: (to, from, next) => {
			document.title = '商城'
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
	}, {
		path: '/docInfo',
		name: 'docInfo',
		component: () => import('./views/DocInfo.vue'),
		beforeEnter: (to, from, next) => {
			document.title = '医生详情'
			next()
		}
	}, {
		path: '/commodityList',
		name: 'commodityList',
		component: () => import('./views/commodityList.vue'),
		beforeEnter: (to, from, next) => {
			document.title = '商品列表'
			next()
		}
	}, ]
})
