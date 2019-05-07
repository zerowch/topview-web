import storage from '@/utils/storage'
export default {
  data () {
    return {
      cookie: storage.get('userCookies') || false
    }
  },
  created () {
    let createTime = this.cookie.createTime
    let nowTime = new Date().getTime()

    const duration = 7 * 24 * 60 * 60 * 1000
    if (nowTime - createTime > duration) {
      storage.remove('userCookies')
    }

    // if (!this.cookie) {
    //   this.$router.push({
    //     path: "/signin",
    //     query: {home: true}
    //   })
    // }
  }
}
