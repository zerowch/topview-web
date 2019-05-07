import session from '@/utils/session'
export default {
  data () {
    return {
      account: session.get('account') || ''
    }
  },
  created () {
    if (typeof this.init === 'function') {
      this.init()
    }
  },
  methods: {
  }
}
