export default {
  created () {
    if (typeof this.init === 'function') {
      this.init()
    }
  }
}