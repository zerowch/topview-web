/*!
 * date 11/20/2018
 * LocalStorage 操作
 */
function set (key, v) {
  // 保存数据到localStorage
  if (typeof v === 'object') {
    localStorage.setItem(key, JSON.stringify(v))
  } else {
    localStorage.setItem(key, v)
  }
}

function get (key, isJSON = true) {
  // 从localStorage获取数据
  if (isJSON) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return localStorage.getItem(key)
  }
}

function remove (key) {
  localStorage.removeItem(key)
}

export default {
  set, get, remove
}
