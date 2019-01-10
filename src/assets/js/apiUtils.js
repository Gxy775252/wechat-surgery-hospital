const Promise = require("bluebird")
import axios from 'axios'
import { promises } from "fs";

const requestType = (type, url, options = {}) => {

  options.method                 = type
  options.url                    = url
  options.header                 = options.header || {}
  options.header['X-source']     = 'wechat'
  if(options.data.fileType != 'file') {
    options.header['Content-Type'] = 'application/json;charset=utf-8;'
  }else{
    options.header['Content-Type'] = 'multipart/form-data;'
  }

  let instance = axios.create();

  function callAPI (resolve, reject) {
    console.log('请求API-=-=-=-',options.data)
    instance.request(options).then(res => {
      // console.log(res,'data')
      resolve(res)
    })
  }
  return new Promise(callAPI)
}

export const _apiPOST = (url, options) => requestType('POST', url, options)

export const _apiGET = (url, options) => requestType('GET', url, options)

export const _apiPUT = (url, options) => requestType('PUT', url, options)

export const _apiDELETE = (url, options) => requestType('DELETE', url, options)
