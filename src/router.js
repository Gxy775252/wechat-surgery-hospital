import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	base: process.env.BASE_URL,
	routes: [
		/**首页相关**/
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
			path: '/',
			name: 'index',
			component: () => import('./views/Index.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医美'
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
		},
		{
			path: '/docInfo',
			name: 'docInfo',
			component: () => import('./views/DocInfo.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医生详情'
				next()
			}
		},
		{
			path: '/doctorCase',
			name: 'doctorCase',
			component: () => import('./views/doctorCase.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '医生案例'
				next()
			}
		},
		{
			path: '/instrumentList',
			name: 'instrumentList',
			component: () => import('./views/instrumentList.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '仪器列表'
				next()
			}
		},
		{
			path: '/instrumentDetail',
			name: 'instrumentDetail',
			component: () => import('./views/instrumentDetail.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '仪器详情'
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
		},
		{
			path: '/diaryDetails',
			name: 'diaryDetails',
			component: () => import('./views/diaryDetails.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '美丽日记详情'
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
			},
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
		/**首页相关 END**/

		/**商城相关**/
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
				window.scrollTo(0, 0);
				document.title = '商品详情'
				next()
			}
		},
		{
			path: '/allEvaluate',
			name: 'allEvaluate',
			component: () => import('./views/allEvaluate.vue'),
			beforeEnter: (to, from, next) => {
				window.scrollTo(0, 0);
				document.title = '全部评价'
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
			path: '/selectAddress',
			path: '/selectAddress',
			name: 'selectAddress',
			component: () => import('./views/selectAddress.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '选择收货地址'
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
			path: '/successfulPayment',
			name: 'successfulPayment',
			component: () => import('./views/successfulPayment.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '付款成功'
				next()
			}
		},
		{
			path: '/shoppingCart',
			name: 'shoppingCart',
			component: () => import('./views/shoppingCart.vue'),
			beforeEnter: (to, from, next) => {
				window.scrollTo(0, 0);
				document.title = '购物车'
				next()
			}
		},
		/**商城相关 END**/

		/**预约相关 **/
		{
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
			path: '/successReserve',
			name: 'successReserve',
			component: () => import('./views/successReserve.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '预订成功'
				next()
			}
		},

		/**预约相关 END**/

		/**个人中心**/
		{
			path: '/mine',
			name: 'mine',
			component: () => import('./views/Mine.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的'
				next()
			}
		},
		{
			path: '/newQRCode',
			name: 'newQRCode',
			component: () => import('./views/newQRCode.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '拉新二维码'
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
			path: '/mineCollector',
			name: 'mineCollector',
			component: () => import('./views/mineCollector.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的收藏'
				next()
			}
		},
		{
			path: '/mineBalance',
			name: 'mineBalance',
			component: () => import('./views/mineBalance.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的余额'
				next()
			}
		},
		{
			path: '/allProfit',
			name: 'allProfit',
			component: () => import('./views/allProfit.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '全部收益'
				next()
			}
		},
		{
			path: '/Recharge',
			name: 'Recharge',
			component: () => import('./views/Recharge.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '充值'
				next()
			}
		},
		{
			path: '/mineIntegral',
			name: 'mineIntegral',
			component: () => import('./views/mineIntegral.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的积分'
				next()
			}
		},
		{
			path: '/mineNewPeople',
			name: 'mineNewPeople',
			component: () => import('./views/mineNewPeople.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的拉新列表'
				next()
			}
		},
		{
			path: '/setupPW',
			name: 'setupPW',
			component: () => import('./views/setupPW.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '积分赠送密码'
				next()
			}
		},
		{
			path: '/setPayPw',
			name: 'setPayPw',
			component: () => import('./views/setPayPw.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '积分赠送密码'
				next()
			}
		},
		{
			path: '/mineReservationOrder',
			name: 'mineReservationOrder',
			component: () => import('./views/mineReservationOrder.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的预约订单'
				next()
			}
		},
		{
			path: '/mineReserveSuccess',
			name: 'mineReserveSuccess',
			component: () => import('./views/mineReserveSuccess.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的预约订单'
				next()
			}
		},
		{
			path: '/mineReserveCheck',
			name: 'mineReserveCheck',
			component: () => import('./views/mineReserveCheck.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的预约订单'
				next()
			}
		},
		{
			path: '/mineOrder',
			name: 'mineOrder',
			component: () => import('./views/mineOrder.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的商城订单'
				next()
			}
		},
		{
			path: '/returnGoodsChoice',
			name: 'returnGoodsChoice',
			component: () => import('./views/returnGoodsChoice.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的商城订单'
				next()
			}
		},
		{
			path: '/returnGoodsApply',
			name: 'returnGoodsApply',
			component: () => import('./views/returnGoodsApply.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '退货申请'
				next()
			}
		},

		{
			path: '/mineExamine',
			name: 'mineExamine',
			component: () => import('./views/mineExamine.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的商城订单'
				next()
			}
		},
		{
			path: '/minePaymentOrder',
			name: 'minePaymentOrder',
			component: () => import('./views/minePaymentOrder.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的商城订单'
				next()
			}
		},
		{
			path: '/mineViewLogistics',
			name: 'mineViewLogistics',
			component: () => import('./views/mineViewLogistics.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的商城订单'
				next()
			}
		},

		{
			path: '/commodityEvaluation',
			name: 'commodityEvaluation',
			component: () => import('./views/commodityEvaluation.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的商城订单'
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
			path: '/mineDiaryList',
			name: 'mineDiaryList',
			component: () => import('./views/mineDiaryList.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的美丽日记'
				next()
			}
		},
		{
			path: '/mineDiaryLists',
			name: 'mineDiaryLists',
			component: () => import('./views/mineDiaryLists.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的美丽日记'
				next()
			}
		},
		/**个人中心 END**/

		/**驻场医生内容**/
		{
			path: '/activation',
			name: 'activation',
			component: () => import('./views/activation.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '激活'
				next()
			}
		},
		{
			path: '/stationingDoctorPersonalCenter',
			name: 'stationingDoctorPersonalCenter',
			component: () => import('./views/stationingDoctorPersonalCenter.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '个人中心'
				next()
			}
		},
		{
			path: '/stationingDoctorOrder',
			name: 'stationingDoctorOrder',
			component: () => import('./views/stationingDoctorOrder.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '预约订单'
				next()
			}
		},
		{
			path: '/stationingDoctorOrderDetail',
			name: 'stationingDoctorOrderDetail',
			component: () => import('./views/stationingDoctorOrderDetail.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '预约订单详情'
				next()
			}
		},
		{
			path: '/stationingMyUser',
			name: 'stationingMyUser',
			component: () => import('./views/stationingMyUser.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '我的用户'
				next()
			}
		},
		{
			path: '/stationingUpload',
			name: 'stationingUpload',
			component: () => import('./views/stationingUpload.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '上传美丽日记'
				next()
			}
		},
		{
			path: '/stationingUploads',
			name: 'stationingUploads',
			component: () => import('./views/stationingUploads.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '上传美丽日记'
				next()
			}
		},
		{
			path: '/seeBeautyDiary',
			name: 'seeBeautyDiary',
			component: () => import('./views/seeBeautyDiary.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '查看美丽日记'
				next()
			}
		},
		{
			path: '/stationingBeautyDiaryDetail',
			name: 'stationingBeautyDiaryDetail',
			component: () => import('./views/stationingBeautyDiaryDetail.vue'),
			beforeEnter: (to, from, next) => {
				document.title = '美丽日记详情'
				next()
			}
		},
		/**驻场医生内容 END**/
	]
})
