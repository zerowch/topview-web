export function stampToTime (stamp) {
  let minute = parseInt(stamp / 60) + ''
  if (minute.length < 2) {
    minute = '0' + minute
  }
  let second = parseInt(stamp % 60) + ''
  if (second.length < 2) {
    second = '0' + second
  }
  return `${minute}:${second}`
}

export function stampToDate (stamp, join) {
  let gap = join || '.'
  let time = new Date(stamp)
  // let timeOffset = time.getTimezoneOffset() * 60 * 1000
  // time = new Date(stamp - timeOffset)
  let year = time.getFullYear() + ''
  let month = time.getMonth() + 1 + ''
  let date = time.getDate() + ''
  let hour = time.getHours() + ''
  let minute = time.getMinutes() + ''

  month = month.length < 2 ? '0' + month : month
  date = date.length < 2 ? '0' + date : date
  hour = hour.length < 2 ? '0' + hour : hour
  minute = minute.length < 2 ? '0' + minute : minute

  let str = `${year}${gap}${month}${gap}${date} ${hour}:${minute}`
  return str
}

export default {
  stampToTime
}
