// const api = require('./apiUtils')
const constants = require('./constants')

// const API_ROOT = constants.requestUrl.substr(0, constants.requestUrl.length - 1)
const API_ROOT = constants.requestUrl

import { _apiPOST, _apiGET, _apiPUT, _apiDELETE } from './apiUtils'

// 获取会员信息 http://chaoxing.juyouyueqi.com/api/index.php?
export const getAPI = (options) => _apiPOST(`${API_ROOT}`, options)

// post获取数据
export const postAPI = (options) => _apiPOST(`${API_ROOT}`, options)
