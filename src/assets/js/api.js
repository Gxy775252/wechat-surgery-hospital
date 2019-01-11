// const api = require('./apiUtils')
const constants = require('./constants')

// const API_ROOT = constants.requestUrl.substr(0, constants.requestUrl.length - 1)
const API_ROOT = 'http://tcjh.suitang1973.com'
// console.log(API_ROOT, '--------API_ROOT')

import {
	_apiPOST,
	_apiGET,
	_apiPUT,
	_apiDELETE
} from './apiUtils'

// 获取会员信息 http://chaoxing.juyouyueqi.com/api/index.php?
export const getAndSendSms = (options) => _apiPOST(`${API_ROOT}/wx/getAndSendSms`, options)

// post获取数据
export const postRegister = (options) => _apiPOST(`${API_ROOT}/wx/register`, options)

// 获取我的页面信息
export const getVipCentor = (options) => _apiPOST(`${API_ROOT}/wx/goVipCentor`, options)

// 获取拉新二维码信息
export const getVipShare = (options) => _apiPOST(`${API_ROOT}/wx/goVipShare`, options)

// 获取充值积分收益列表信息
export const getChargeInterestList = (options) => _apiPOST(`${API_ROOT}/wx/getChargeInterestList`, options)

/**首页相关 --------------------------------------------**/

// 获取首页列表信息
export const getIndex = (options) => _apiPOST(`${API_ROOT}/wx/goMain`, options)

// 获取医生列表信息 
export const getDoctorList = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorList`, options)

// 获取医生详情信息 
export const getDoctorDetail = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorDetail`, options)

// 获取医生案例列表信息 
export const getDoctorCase = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorCase`, options)

// 获取仪器列表信息 
export const getInstrumentList = (options) => _apiPOST(`${API_ROOT}/wx/goInstList`, options)

// 获取美丽日记列表信息
export const getBeautifulDiary = (options) => _apiPOST(`${API_ROOT}/wx/goDiaryList`, options)

// 获取美丽日记详情信息
export const getdiaryDetails = (options) => _apiPOST(`${API_ROOT}/wx/goDiaryDetail`, options)

/**首页相关 -------------------------------------------- END**/



/**商城相关 --------------------------------------------**/

// 获取商品首页信息
export const getShoppingMall = (options) => _apiPOST(`${API_ROOT}/wx/goShop`, options)

// 获取商品列表页信息
export const getCommodityList = (options) => _apiPOST(`${API_ROOT}/wx/goClassifyGoodsList`, options)

// 获取商品详情页信息
export const getCommodityDetail = (options) => _apiPOST(`${API_ROOT}/wx/goGoodsDetail`, options)

// 获取商品全部评论页信息
export const getAllComments = (options) => _apiPOST(`${API_ROOT}/wx/getAllComments`, options)

// 添加收藏商品
export const getFavorGoods = (options) => _apiPOST(`${API_ROOT}/wx/favorGoods`, options)

// 将商品添加到购物车
export const addCart = (options) => _apiPOST(`${API_ROOT}/wx/joinCart`, options)

// 立即购买
export const submitGoodsOrder = (options) => _apiPOST(`${API_ROOT}/wx/genGoodsOrder`, options)

// 订单确认页面
export const getConfirmOrder = (options) => _apiPOST(`${API_ROOT}/wx/goConfirmOrder`, options)

// 获取地址列表页面setVipAddressid
export const getVipAddressList = (options) => _apiPOST(`${API_ROOT}/wx/getVipAddressList`, options)

// 选择地址
export const setVipAddressid = (options) => _apiPOST(`${API_ROOT}/wx/setVipAddressid`, options)

// 编辑地址详情
export const getVipAddressDetail = (options) => _apiPOST(`${API_ROOT}/wx/getVipAddressDetail`, options)

// 删除地址
export const deleteVipAddressid = (options) => _apiPOST(`${API_ROOT}/wx/deleteVipAddressid`, options)




// 获取我的购物车信息
export const getMyCart = (options) => _apiPOST(`${API_ROOT}/wx/getMyCart`, options)

/**商城相关 -------------------------------------------- END**/
