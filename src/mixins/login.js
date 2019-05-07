// 工具
import request from '@/utils/request.js'
import { pwdEncrypt } from '@/utils/pwdEncrypt.js'
import storage from '@/utils/storage' // storage工具

export default {
  data () {
    return {
      login: {
        phone: '',
        password: ''
      }
    }
  },
  computed: {
    loginPhone () {
      return this.login.phone.replace('+', '')
    }
  },
  methods: {
    loginSubmit () {
      this.$refs.alert.display('logging in')
      request.get('login-user!userLogin.action', {
        username: this.loginPhone,
        password: pwdEncrypt(this.login.password)
      })
        .then(res => {
          this.$refs.alert.close()
          let data = res.data
          if (data.code === '100') {
            let resData = data.data

            storage.set('userCookies', {
              sessionKey: resData.seesionKey,
              account: resData.userLogin.userAccount,
              username: resData.userInfo.userName,
              avatar: resData.userInfo.userHpic,
              createTime: new Date().getTime()
            })

            this.$refs.alert.display('success', 1000)
              .then(() => {
                window.history.go(0)
              })
          } else {
            this.$refs.alert.display(data.other, 1000)
          }
        })
    }
  }
}
