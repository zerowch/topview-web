import md5 from 'md5'

export function pwdEncrypt (pwd) {
  let md5Code = md5(pwd + '123mfl')
  let result
  result = md5Code
  // result = md5Code.substring(md5Code.length - 2, md5Code.length)
  // + md5Code.substring(2, md5Code.length - 2)
  // + md5Code.substring(0, 2)

  return result
}
