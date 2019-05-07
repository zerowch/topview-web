// 工具
import request from '@/utils/request.js'
import { pwdEncrypt } from '@/utils/pwdEncrypt.js'

export default {
  data () {
    return {
      changePwd: {
        password: '',
        newPassword: '',
        confirm: ''
      }
    }
  },
  methods: {
    changPwdSubmit () {
      if (this.changePwd.newPassword !== this.changePwd.confirm) {
        this.$refs.alert.display('The passwords were different', 1000)
        return false
      }

      request.get('app/user!updatePassword', {
        account: this.cookie.account,
        password: pwdEncrypt(this.changePwd.password),
        newPassword: pwdEncrypt(this.changePwd.newPassword)
      })
        .then(res => {
          let data = res.data
          this.$refs.alert.display(data.other, 1000)
            .then(() => {
              if (data.code === '100') {
                this.$router.push('/signin')
              }
            })
        })
    }
  }
}
