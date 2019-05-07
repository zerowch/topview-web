import axios from 'axios'
import config from '@/config'
import session from '@/utils/session.js'

/*!
 * @author Christian Fröhlingsdorf krystianity
 * date 10/18/2017
 * 将json转换成formData
 */
function jsonToFormData (jData) {
  const EQUAL = '='
  const AMP = '&'
  return Object.keys(jData)
    .map(key => Array.isArray(jData[key])
      ? jData[key].map(value => key + EQUAL + encodeURIComponent(value)).join(AMP)
      : key + EQUAL + encodeURIComponent(jData[key])
    ).join(AMP)
}

export function get (path, data, headers) {
  // return axios.get(config.server + path, {
  //   params: data,
  //   headers: headers || {}
  // })
  // console.log(headers)
  if (headers === 'session') {
    headers = {
      'session-value': session.get('sessionKey')
    }
  }
  return axios.request({
    url: config.server + path,
    method: 'get',
    params: data,
    headers: headers || {}
  })
}

export function post (path, data, headers) {
  if (headers === 'session') {
    headers = {
      'session-value': session.get('sessionKey')
    }
  }
  return axios.request({
    url: config.server + path,
    method: 'post',
    params: data,
    headers: headers || {}
  })
}

export function upload (path, data) {
  return axios.post(config.server + path, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export default {
  get, post, upload, jsonToFormData
}
