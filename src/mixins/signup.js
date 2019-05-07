// 工具
import request from '@/utils/request.js'
import { pwdEncrypt } from '@/utils/pwdEncrypt.js'
// import storage from '@/utils/storage' // storage工具

export default {
  data () {
    return {
      signup: {
        phone: '',
        password: '',
        otp: '',
        sendReady: false,
        waiting: false,
        btnText: 'Send OTP',
        sessionIdKey: ''
      }
    }
  },
  computed: {
    signupPhone () {
      return this.signup.phone.replace('+', '')
    }
  },
  methods: {
    sendMsg () {
      if (!this.signup.sendReady) {
        return false
      }
      this.signup.waiting = true
      this.signup.sendReady = false
      this.$refs.alert.display('Sending the OTP')
      let time = 10
      const loop = setInterval(() => {
        if (time === 0) {
          this.signup.btnText = 'Send again'
          this.signup.waiting = false
          this.sendStatus(this.signupPhone)
          clearInterval(loop)
        } else {
          this.signup.btnText = `wait ${time}s`
          time--
        }
      }, 1000)

      request.get('login-user!userSendMsg.action', {
        phone: this.signupPhone
      })
        .then(res => {
          this.signup.sessionIdKey = res.data.data.Details
          this.$refs.alert.close()
        })
    },
    sendStatus (val) {
      if ((val.length === 13 || val.length === 12) && !this.signup.waiting) {
        this.signup.sendReady = true
      } else {
        this.signup.sendReady = false
      }
    },
    signUpsubmit () {
      let token = pwdEncrypt(this.password)
      request.get('login-user!addUser.action', {
        phone: this.phone,
        code: this.otp,
        password: this.password,
        sessionIdKey: this.sessionIdKey,
        tokenKey: token
      })
        .then(res => {
          // eslint-disable-next-line
          let data = res.data
          this.$refs.alert.display(data.other, 1000)
            .then(() => {
              this.$refs.signupModal.close()
            })
        })
    }
  },
  watch: {
    signupPhone (v) {
      this.sendStatus(v)
    }
  }
}
