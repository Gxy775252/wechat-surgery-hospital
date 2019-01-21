// const api = require('./apiUtils')
const constants = require('./constants')

// const API_ROOT = constants.requestUrl.substr(0, constants.requestUrl.length - 1)
const API_ROOT = 'http://tcjh.suitang1973.com'

import {
	_apiPOST,
	_apiGET,
	_apiPUT,
	_apiDELETE
} from './apiUtils'

// 根据code 换取用户信息 /wx/getOpenidByCode
export const getUserWechatInfo = (options) => _apiPOST(`${API_ROOT}/wx/getOpenidByCode`, options)

// 获取会员信息 http://chaoxing.juyouyueqi.com/api/index.php?
export const getAndSendSms = (options) => _apiPOST(`${API_ROOT}/wx/getAndSendSms`, options)

// post获取数据
export const postRegister = (options) => _apiPOST(`${API_ROOT}/wx/register`, options)

//	上传图片
export const uploadPic = (options) => _apiPOST(`${API_ROOT}/wx/uploadPic`, options)

// 微信 config /wx/getJssdkSign
export const getWechatConfig = (options) => _apiPOST(`${API_ROOT}/wx/getJssdkSign`, options)

// 微信 支付 签名
export const getWechatPay = (options) => _apiPOST(`${API_ROOT}/wx/getWxpaySign`, options)

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

// 获取仪器详情
export const goInstDetail = (options) => _apiPOST(`${API_ROOT}/wx/goInstDetail`, options)

// 获取美丽日记列表信息
export const getBeautifulDiary = (options) => _apiPOST(`${API_ROOT}/wx/goDiaryList`, options)

// 获取美丽日记详情信息
export const getdiaryDetails = (options) => _apiPOST(`${API_ROOT}/wx/goDiaryDetail`, options)

// 获取问答列表
export const getQaList = (options) => _apiPOST(`${API_ROOT}/wx/getQaList`, options)

// 获取问答详情
export const getQaDetail = (options) => _apiPOST(`${API_ROOT}/wx/getQaDetail`, options)

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

// 提交订单
export const submitConfirmOrder = (options) => _apiPOST(`${API_ROOT}/wx/submitConfirmOrder`, options)

// 订单确认页面
export const getConfirmOrder = (options) => _apiPOST(`${API_ROOT}/wx/goConfirmOrder`, options)

// 获取地址列表页面setVipAddressid
export const getVipAddressList = (options) => _apiPOST(`${API_ROOT}/wx/getVipAddressList`, options)

// 选择地址
export const setVipAddressid = (options) => _apiPOST(`${API_ROOT}/wx/setVipAddressid`, options)

// 获取地址详情
export const getVipAddressDetail = (options) => _apiPOST(`${API_ROOT}/wx/getVipAddressDetail`, options)

// 保存地址
export const saveVipAddress = (options) => _apiPOST(`${API_ROOT}/wx/saveVipAddress`, options)

// 删除地址
export const deleteVipAddressid = (options) => _apiPOST(`${API_ROOT}/wx/deleteVipAddressid`, options)

// 获取我的购物车信息
export const getMyCart = (options) => _apiPOST(`${API_ROOT}/wx/getMyCart`, options)

// 修改商品数量
export const changeCartCount = (options) => _apiPOST(`${API_ROOT}/wx/changeCartCount`, options)

// 从购物车删除商品
export const deleteFromCart = (options) => _apiPOST(`${API_ROOT}/wx/deleteFromCart`, options)

/**商城相关 -------------------------------------------- END**/


/**预约相关 -------------------------------------------- **/

// 预约首页
export const goAppointment = (options) => _apiPOST(`${API_ROOT}/wx/goAppointment`, options)

// 获取医院的项目列表
export const getHospitalProjectList = (options) => _apiPOST(`${API_ROOT}/wx/getHospitalProjectList`, options)

// 获取项目的可选医生列表
export const getProjectDoctorList = (options) => _apiPOST(`${API_ROOT}/wx/getProjectDoctorList`, options)

// 获取项目详情
export const getProjectDetail = (options) => _apiPOST(`${API_ROOT}/wx/getProjectDetail`, options)

// 模板消息-预约详情页
export const goModelOrderDetail = (options) => _apiPOST(`${API_ROOT}/wx/goModelOrderDetail`, options)

// 模板消息-满意度调查页
export const goModelSurvey = (options) => _apiPOST(`${API_ROOT}/wx/goModelSurvey`, options)

// 提交满意度调查
export const submitSurvey = (options) => _apiPOST(`${API_ROOT}/wx/submitSurvey`, options)

//  提交预约
export const submitProjectOrder = (options) => _apiPOST(`${API_ROOT}/wx/submitProjectOrder`, options)

/**预约相关 -------------------------------------------- END**/


/**个人中心 -------------------------------------------- **/

// 获取我的页面信息
export const getVipCentor = (options) => _apiPOST(`${API_ROOT}/wx/goVipCentor`, options)

// 获取我的信息
export const getVipDetail = (options) => _apiPOST(`${API_ROOT}/wx/getVipDetail`, options)

// 保存信息
export const saveVipInfo = (options) => _apiPOST(`${API_ROOT}/wx/saveVipInfo`, options)

// 获取我的收藏页面信息
export const getVipFavorList = (options) => _apiPOST(`${API_ROOT}/wx/getVipFavorList`, options)

// 取消收藏
export const unfavor = (options) => _apiPOST(`${API_ROOT}/wx/unfavor`, options)

// 我的余额页
export const goVipBalance = (options) => _apiPOST(`${API_ROOT}/wx/goVipBalance`, options)

//  充值页
export const goVipChargeList = (options) => _apiPOST(`${API_ROOT}/wx/goVipChargeList`, options)

//   提交充值请求
export const submitCharge = (options) => _apiPOST(`${API_ROOT}/wx/submitCharge`, options)

//    我的积分页
export const goVipScore = (options) => _apiPOST(`${API_ROOT}/wx/goVipScore`, options)

//     实时获取积分余额
export const getVipScoreBal = (options) => _apiPOST(`${API_ROOT}/wx/getVipScoreBal`, options)

//    赠送积分
export const genScoreGift = (options) => _apiPOST(`${API_ROOT}/wx/genScoreGift`, options)

// 获取我的肤质页面信息
export const goVipSkinInfo = (options) => _apiPOST(`${API_ROOT}/wx/goVipSkinInfo`, options)

//提交肤质信息
export const submitSkininfo = (options) => _apiPOST(`${API_ROOT}/wx/submitSkininfo`, options)

//获取我的日记列表
export const getVipDiaryList = (options) => _apiPOST(`${API_ROOT}/wx/getVipDiaryList`, options)

//获取我的日记详情
export const getVipDiaryDetail = (options) => _apiPOST(`${API_ROOT}/wx/getVipDiaryDetail`, options)

//获取我的日记详情
export const saveDiary = (options) => _apiPOST(`${API_ROOT}/wx/saveDiary`, options)

//重置密码
export const getResetGiftPwd = (options) => _apiPOST(`${API_ROOT}/wx/resetGiftPwd`, options)

//  我的预约单列表
export const getVipGoodsOrderList = (options) => _apiPOST(`${API_ROOT}/wx/getVipGoodsOrderList`, options)

//  取消预约单
export const cancelPrjtOrder = (options) => _apiPOST(`${API_ROOT}/wx/cancelPrjtOrder`, options)

//  取消预约单
export const getVipPrjtOrderDetail = (options) => _apiPOST(`${API_ROOT}/wx/getVipPrjtOrderDetail`, options)

//  取消商城单
export const cancelGoodsOrder = (options) => _apiPOST(`${API_ROOT}/wx/cancelGoodsOrder`, options)

//  申请退货退款页面
export const refundOrder = (options) => _apiPOST(`${API_ROOT}/wx/refundOrder`, options)

// 获取拉新二维码信息
export const getVipShare = (options) => _apiPOST(`${API_ROOT}/wx/goVipShare`, options)

// 获取充值积分收益列表信息
export const getChargeInterestList = (options) => _apiPOST(`${API_ROOT}/wx/getChargeInterestList`, options)

/**个人中心 -------------------------------------------- END**/


/**驻场医生 -------------------------------------------- start**/

// 驻场医生-个人中心
export const getDoctorDetailSettled = (options) => _apiPOST(`${API_ROOT}/wx/getDoctorDetail`, options)

//驻场医生-预约订单
export const getDoctorOrderList = (options) => _apiPOST(`${API_ROOT}/wx/getDoctorOrderList`, options)

//驻场医生-订单详情
export const getDoctorOrderDetail = (options) => _apiPOST(`${API_ROOT}/wx/getDoctorOrderDetail`, options)

//驻场医生 - 我的用户
export const getDoctorVipList = (options) => _apiPOST(`${API_ROOT}/wx/getDoctorVipList`, options)

//驻场医生 - 查看美丽日记
export const goDoctorVipDiaryList = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorVipDiaryList`, options)

//驻场医生 - 上传美丽日记
export const goDoctorDiaryAdd = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorDiaryAdd`, options)

//驻场医生 - 美丽日记详情
export const goDoctorDiaryDetail = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorDiaryDetail`, options)

//驻场医生 - 删除
export const delVipDiary = (options) => _apiPOST(`${API_ROOT}/wx/delVipDiary`, options)

//驻场医生 - 上传美丽日记订单详情
export const getVipOrderList = (options) => _apiPOST(`${API_ROOT}/wx/getVipOrderList`, options)

/**驻场医生 -------------------------------------------- END**/
