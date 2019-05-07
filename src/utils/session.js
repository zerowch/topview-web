/*!
 * date 10/30/2018
 * session key function
 */
function set (key, v) {
  // 保存数据到sessionStorage
  sessionStorage.setItem(key, v)
}

function get (key) {
  // 从sessionStorage获取数据
  return sessionStorage.getItem(key)
}

export default {
  set, get
}
