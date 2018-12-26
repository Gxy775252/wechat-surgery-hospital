// const api = require('./apiUtils')
const constants = require('./constants')

// const API_ROOT = constants.requestUrl.substr(0, constants.requestUrl.length - 1)
const API_ROOT = 'http://tcjh.suitang1973.com'
console.log(API_ROOT,'--------API_ROOT')

import { _apiPOST, _apiGET, _apiPUT, _apiDELETE } from './apiUtils'

// 获取会员信息 http://chaoxing.juyouyueqi.com/api/index.php?
export const getAndSendSms = (options) => _apiPOST(`${API_ROOT}/wx/getAndSendSms`, options)

// post获取数据
export const postRegister = (options) => _apiPOST(`${API_ROOT}/wx/register`, options)

// 获取医生列表信息 
export const getDoctorList = (options) => _apiPOST(`${API_ROOT}/wx/goDoctorList`, options)

// 获取仪器列表信息 
export const getInstrumentList = (options) => _apiPOST(`${API_ROOT}/wx/goInstList`, options)