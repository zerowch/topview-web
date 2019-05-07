export function getQuery (key) {
  let search = window.location.search.replace('?', '')
  let searchArray = search.split('&')
  let object = {}
  searchArray.forEach(v => {
    let temporaryArray = v.split('=')
    object[temporaryArray[0]] = temporaryArray[1]
  })
  if (key) {
    return object[key]
  }
  return object
}

export default {
  getQuery
}
