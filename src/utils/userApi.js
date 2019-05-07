import request from './request'

export async function isLogin () {
  let res = await request.post('app/user!userIsLogin', {
    account: sessionStorage.getItem('account')
  }, {
    'session-value': sessionStorage.getItem('sessionKey')
  })
  return res
}

export async function getMoney () {
  let res = await request.post('app/user!getMoney', {
    account: sessionStorage.getItem('account')
  }, {
    'session-value': sessionStorage.getItem('sessionKey')
  })
  return res
}

export default {
  isLogin
}